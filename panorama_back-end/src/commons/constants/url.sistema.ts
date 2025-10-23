
import { JURADO, ORGANIZACAO, PARTICIPANTE, USUARIO } from "./constants.sistema";

export const SERVIDOR = 'http://localhost:8000';

const ROTA_SISTEMA = 'rest/panoramalitterarium';
const ROTA_AUTH = 'rest/auth';   

const LIST = 'listar';
const CREATE = "registrar"
const BY_ID = 'buscar';
const UPDATE = 'alterar';
const DELETE = 'excluir';

function gerarRotasSistema(entity: string){
    const base = `/${ROTA_SISTEMA}/${entity}`;

    return {
          BASE: base,
          LIST: `${LIST}`,
          CREATE: `${CREATE}`,
          BY_ID: `${BY_ID}`,
          UPDATE: `${UPDATE}`,
          DELETE: `${DELETE}`
    }
}


export const ROTA = {
    USUARIO: gerarRotasSistema(USUARIO),
    ORGANIZACAO: gerarRotasSistema(ORGANIZACAO),
    JURADO: gerarRotasSistema(JURADO),
    PARTICIPANTE: gerarRotasSistema(PARTICIPANTE)
}


