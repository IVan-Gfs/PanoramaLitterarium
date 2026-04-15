import { Link } from "./mensagem";
import { MensagemSistema } from "./mensagem.sistema";
import { Response } from 'express';
export function sendHttpResponse<T>(
    res: Response,
    status: number,
    mensagem: string | null,
    dados: T | null,
    path: string | null,
    erro: string | any | null,
    _link: Record<string, Link> | null

) {
    return res.status(status).json(MensagemSistema.showMensagem(status, mensagem, dados, path, erro))
}




