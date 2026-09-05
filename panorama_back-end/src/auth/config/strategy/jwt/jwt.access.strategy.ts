import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.access_token,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
  // Captura o ID de onde ele estiver guardado no payload (geralmente payload.id ou payload.sub)
  const usuarioId = payload.id || payload.sub;

  if (!usuarioId) {
    throw new UnauthorizedException('ID do usuário não encontrado no payload do token.');
  }

  // Busca o usuário trazendo o Perfil e as três tabelas de papel
  const usuarioCompleto = await this.prisma.usuario.findUnique({
    where: { 
      id: usuarioId // Passa o ID correto que não seja undefined
    }, 
    include: {
      perfil: {
        include: {
          organizacao: true,
          jurado: true,
          participante: true,
        },
      },
    },
  });

  if (!usuarioCompleto) {
    throw new UnauthorizedException('Usuário não encontrado.');
  }

  return usuarioCompleto;
}

}