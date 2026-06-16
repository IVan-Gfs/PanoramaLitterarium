import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Usuario } from "@prisma/client";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: "email",
            passwordField: "senha"
        })
    }

    async validate(email: string, password: string): Promise<Usuario | null> {
        const user = await this.authService.getAuthenticated(email, password)
        return user;
    }
}