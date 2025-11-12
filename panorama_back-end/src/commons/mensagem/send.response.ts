import { MensagemSistema } from "./mensagem.sistema";
import { Response } from 'express';
export function sendHttpResponse<T>(
    res: Response,
    status: number,
    mensagem: string | null,
    dados: T | null,
    path: string | null,
    erro: string | any | null,

) {
    return res.status(status).json(MensagemSistema.showMensagem(status, mensagem, dados, path, erro))
}




