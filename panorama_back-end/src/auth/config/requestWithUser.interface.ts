import { Prisma, Usuario } from "@prisma/client";
import { Request } from "express";

export interface AuthMeta {
    ip: string;
    userAgent: string;
    browser: any;
    os: string;
    platform: string;
}
type UsuarioComRelacoes = Prisma.UsuarioGetPayload<{
  include: {
    perfil: {
      include: {
        organizacao: true;
        jurado: true;
        participante: true;
      };
    };
  };
}>;
interface requestWithUser extends Request{
    user: UsuarioComRelacoes;
    authMeta?: AuthMeta;
}

export default requestWithUser;