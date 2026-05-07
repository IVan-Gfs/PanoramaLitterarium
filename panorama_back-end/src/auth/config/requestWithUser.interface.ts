import { Usuario } from "@prisma/client";
import { Request } from "express";

interface requestWithUser extends Request{
    user: Usuario;
}

export default requestWithUser;