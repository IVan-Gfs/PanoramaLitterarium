import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt"
import { JsonWebTokenService, UserToken } from "./jwt.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly jsonWeTokenService: JsonWebTokenService
    ){}

    async getJwtToken(usuario: Usuario){
        const userToken: UserToken = {
            id: Number(usuario.id),
            email: usuario.email

        }
        const { accessToken } = await this.jsonWeTokenService.createAccessToken(userToken);

        return accessToken;
    }

    async getAuthenticated(email: string, pass: string): Promise<Usuario>{
        const usuario = await this.findByEmail(email)

        if(!usuario){
            throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND)
        }

        if(!usuario.statusValidacao){
            throw new HttpException('Email ainda não validado', HttpStatus.UNAUTHORIZED)
        }

        await this.verifyPassword(pass, usuario.senha)
        return usuario;
    }

    async createVerificationToken(usuario: Usuario){
        const userToken: UserToken = {
            id: Number(usuario.id),
            email: usuario.email
        }
        const { verificationToken } = await this.jsonWeTokenService.createVerificationToken(userToken);
        return verificationToken;
    }

    async confirmEmail(token: string){
        const payload = await this.jsonWeTokenService.verifyToken(token, 'verification') as UserToken;

        if(!payload?.id){
            throw new HttpException('Token de confirmação inválido', HttpStatus.BAD_REQUEST)
        }

        const userId = Number(payload.id);
        const usuario = await this.prisma.usuario.findUnique({ where: { id: userId } });

        if(!usuario){
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
        }

        if(usuario.statusValidacao){
            return { message: 'Email já validado' };
        }

        await this.prisma.usuario.update({
            where: { id: userId },
            data: { statusValidacao: true },
        })

        return { message: 'Email validado com sucesso' };
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        return await this.prisma.usuario.findUnique({
            where: {
                email: email,
            }
        })
    }

    async verifyPassword(senha: string, hashedSenha: string): Promise<boolean>{
        const isSenhaMatching = await bcrypt.compare(senha, hashedSenha)
        if(!isSenhaMatching){
            throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST)
        }
        return true;
    }
}