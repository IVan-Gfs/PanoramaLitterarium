import { Usuario } from "@prisma/client";
import { Request } from "express";

export interface AuthMeta {
    ip: string;
    userAgent: string;
    browser: any;
    os: string;
    platform: string;
}

interface requestWithUser extends Request{
    user: Usuario;
    authMeta?: AuthMeta;
}

export default requestWithUser;