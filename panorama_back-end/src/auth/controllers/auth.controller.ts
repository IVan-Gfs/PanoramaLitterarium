import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UsuarioService } from "src/usuario/services/usuario.service";
import { AuthService } from "../services/auth.service";
import requestWithUser from "../config/requestWithUser.interface";
import { LocalAuthGuard } from "../config/guard/local.auth.guard";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,
        //private readonly usuarioService: UsuarioService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('/session/login')
    async login(
        @Req() req: requestWithUser
    ){

       const accessToken = await this.authService.getJwtToken(req.user)
        return 'token do usuário auteticado: ' + (accessToken)
    }
}