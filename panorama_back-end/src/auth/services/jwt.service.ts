import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "jsonwebtoken";
export interface UserToken {
    id?: number | bigint;
    email?: string;
}
export type TokenType = 'access' | 'refresh' | 'verification';

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expireInAccessToken: number;
    expireInRefreshToken: number;
}
@Injectable()
export class JsonWebTokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async createAccessToken(usuario: UserToken, timer?: number){
        const { id } = usuario;
        const data: JwtPayload = {
            id,
        }

        const expireInAccessToken = this.expireInSecondsAccessToken()
        const secretAccessToken = this.secretAccessToken()
        const accessToken = await this.jwtService.signAsync(data, {
            secret: secretAccessToken,
            expiresIn: `${expireInAccessToken}s`
        })
        return { accessToken, expireInAccessToken}
    }
    async createRefreshToken(usuario: UserToken){
        const { id} = usuario;
        const data: JwtPayload = {
            id,
        }

        const expireInRefreshToken = this.expireInSecondsRefreshToken()
        const secretRefreshToken = this.secretRefreshToken()
        const refreshToken = await this.jwtService.signAsync(data, {
            secret: secretRefreshToken,
            expiresIn: `${expireInRefreshToken}s`
        })
        return { refreshToken, expireInRefreshToken}
    }

    async createVerificationToken(usuario: UserToken, timer?: number){
        const { id } = usuario;
        const data: JwtPayload = {
            id,
        }

        const expireInVerificationToken = timer ?? this.configService.getOrThrow('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME');
        const secretVerificationToken = this.configService.getOrThrow('JWT_VERIFICATION_TOKEN_SECRET');
        const verificationToken = await this.jwtService.signAsync(data, {
            secret: secretVerificationToken,
            expiresIn: `${expireInVerificationToken}s`
        });

        return { verificationToken, expireInVerificationToken };
    }

    private secretAccessToken(){
        return this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET')
    }

    private secretRefreshToken(){
        return this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET')
    }

    private expireInSecondsAccessToken(timer?: number): number {
        return (
            timer ?? this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
        )
    }

    private expireInSecondsRefreshToken(){
        return this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
    }

    async verifyToken(token: string, type: TokenType = 'access'){
        return await this.jwtService.verify(token, {
            secret: this.getSecretByTokenType(type)
        })
    }

    private getSecretByTokenType(type: TokenType): string{
        switch (type) {
            case "access":
                return this.secretAccessToken();
            case "refresh":
                return this.secretRefreshToken();
            case "verification":
                return this.configService.getOrThrow('JWT_VERIFICATION_TOKEN_SECRET');
            default:
                throw new Error('Invalid token type');
        }
    }
}
