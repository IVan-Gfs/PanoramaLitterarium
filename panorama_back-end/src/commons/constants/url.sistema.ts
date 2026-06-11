
import {
  USUARIO,
  PESSOA,
  PARTICIPANTE,
  JURADO,
  ORGANIZACAO,
  CONCURSO,
  BANCA,
  OBRA,
  INSCRICAO,
  SUBMISSAO,
  ANALISE,
  NOTA,
  ANOTACAO,
  CRITERIO,
  GRUPO_CRITERIO,
  CATEGORIA
} from "./constants.sistema";

export const SERVIDOR = 'http://localhost:8000';

const ROTA_SISTEMA = 'panorama-litterarium/api/v1';
const ROTA_AUTH = 'panorama-litterarium/api/v1/auth';   

const LIST = 'list';
const CREATE = 'create';
const BY_ID = 'get';      
const UPDATE = 'update';
const DELETE = 'delete';

function gerarRotasSistema(entity: string){
    const base = `/${ROTA_SISTEMA}/${entity}`;
    return {
          BASE: base,
          LIST: `/${LIST}`,
          CREATE: `/${CREATE}`,
          BY_ID: `${BY_ID}`,
          UPDATE: `${UPDATE}`,
          DELETE: `${DELETE}`
    }
}

function gerarRotasAuth(){
    const base = `/${ROTA_AUTH}`;
    return {
      BASE: base,
      LOGIN: `/session/login`,
      CONFIRM_EMAIL: `/confirmation`
    }
}

export const ROTA = {

  AUTH: gerarRotasAuth(),

  USUARIO: gerarRotasSistema(USUARIO),
  PESSOA: gerarRotasSistema(PESSOA),
  ORGANIZACAO: gerarRotasSistema(ORGANIZACAO),
  JURADO: gerarRotasSistema(JURADO),
  PARTICIPANTE: gerarRotasSistema(PARTICIPANTE),
  
  CONCURSO: gerarRotasSistema(CONCURSO),
  BANCA: gerarRotasSistema(BANCA),
  CATEGORIA: gerarRotasSistema(CATEGORIA),

  OBRA: gerarRotasSistema(OBRA),
  INSCRICAO: gerarRotasSistema(INSCRICAO),
  SUBMISSAO: gerarRotasSistema(SUBMISSAO),

  ANALISE: gerarRotasSistema(ANALISE),
  NOTA: gerarRotasSistema(NOTA),
  ANOTACAO: gerarRotasSistema(ANOTACAO),

  CRITERIO: gerarRotasSistema(CRITERIO),
  GRUPO_CRITERIO: gerarRotasSistema(GRUPO_CRITERIO)
};

