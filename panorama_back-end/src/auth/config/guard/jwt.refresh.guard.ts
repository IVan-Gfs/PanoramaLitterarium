export class JwtRefreshGuard {
    canActivate(context: any): boolean {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request?.cookies?.refresh_token;
        return !!refreshToken;
    }
}