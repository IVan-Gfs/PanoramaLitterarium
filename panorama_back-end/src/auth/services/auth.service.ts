import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    async getAuthenticated(email: string, pass: string): Promise<Usuario | null>{
        const usuario = await this.findByEmail(email)

       if(!usuario){
            throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND)
        }
        const matching = await this.verifyPassword(pass, usuario?.senha)

        if(!matching){
            throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST)
        }
        return usuario;
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                email: email,
            }
        })
        if(!usuario){
            throw new HttpException('Usuário não cadastrado', HttpStatus.NOT_FOUND)
        }

        return usuario;

    }

    async verifyPassword(senha: string, hashedSenha: string): Promise<boolean>{
        const isSenhaMatching = await bcrypt.compare(senha, hashedSenha)
        if(!isSenhaMatching){
            throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST)
        }
         return true;

    }
}