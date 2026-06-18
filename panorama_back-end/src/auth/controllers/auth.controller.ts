import { BadRequestException, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import requestWithUser from "../config/requestWithUser.interface";
import { LocalAuthGuard } from "../config/guard/local.auth.guard";
import { ROTA } from "src/commons/constants/url.sistema";
import { Response } from "express";

@Controller(ROTA.AUTH.BASE)
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post(ROTA.AUTH.LOGIN)
    async login(
        @Req() req: requestWithUser,
        @Res({ passthrough: true }) res: Response
    ){
        console.log('User in request:', req.user);
        const accessToken = await this.authService.getJwtToken(req.user)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,                      // Protege contra ataques XSS (scripts maliciosos)
            secure: false,                       
            sameSite: 'lax',                     // Permite o envio do cookie em requisições do mesmo domínio
            maxAge: 1000 * 60 * 60 * 24,         // Tempo de expiração do cookie (1 dia)
        });

        return { accessToken }
    }


    @Post(ROTA.AUTH.LOGOUT)
    async logout(@Res({ passthrough: true }) res: Response) {
        
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false, 
            sameSite: 'lax',
        });

        return { message: 'Logout realizado com sucesso!' };
    }

    @Get(ROTA.AUTH.CONFIRM_EMAIL)
    async confirmEmail(@Query('token') token: string){
        if(!token){
            throw new BadRequestException('Token de confirmação não informado');
        }
        return this.authService.confirmEmail(token);
    }
}