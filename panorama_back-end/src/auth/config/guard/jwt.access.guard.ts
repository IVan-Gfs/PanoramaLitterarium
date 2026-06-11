import { ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
import { ApiException } from "src/commons/exceptions/erros/api.exception";

@Injectable()
export default class JwtAccessGuard extends PassportAuthGuard('jwt-access') {
    constructor() {
        super({
            passReqToCallback: true,
        });
    }

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const cookieToken = this.extractTokenFromCookie(request);
        const authorizationHeader = request?.headers?.authorization;

        if(!cookieToken && !authorizationHeader){
            throw new ApiException(
                'Token de acesso não encontrado.', 
                HttpStatus.UNAUTHORIZED, 'Unauthorized'
            );
        }

        return super.canActivate(context) as boolean | Promise<boolean>;
    }

    private extractTokenFromCookie(request: any) {
        const cookieName = process.env.SESSION_COOKIE_NAME || 'access_token';
        const sessionToken = request?.cookies?.[cookieName];
        return sessionToken || null;
    }
}
