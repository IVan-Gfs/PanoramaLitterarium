import { BadRequestException, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import requestWithUser from "../config/requestWithUser.interface";
import { LocalAuthGuard } from "../config/guard/local.auth.guard";
import { ROTA } from "src/commons/constants/url.sistema";

@Controller(ROTA.AUTH.BASE)
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post(ROTA.AUTH.LOGIN)
    async login(
        @Req() req: requestWithUser
    ){
        console.log('User in request:', req.user); // Log para verificar o conteúdo de req.user
        const accessToken = await this.authService.getJwtToken(req.user)
        return { accessToken }
    }

    @Get(ROTA.AUTH.CONFIRM_EMAIL)
    async confirmEmail(@Query('token') token: string){
        if(!token){
            throw new BadRequestException('Token de confirmação não informado');
        }
        return this.authService.confirmEmail(token);
    }
}