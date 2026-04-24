import { CONCURSO } from "../entities/concurso/constants/concurso.constants";

export const DASHBOARD = `/dashboard`;

const LISTAR = `list`;
const CRIAR = "create";
const POR_ID = `get`;
const ATUALIZAR = `update`;
const EXCLUIR = `delete`;

function gerarRotaSistema(entity: string) {
  const base = `/${entity}`;
  return {
    LISTAR: `/${base}/${LISTAR}`,
    CRIAR: `/${base}/${CRIAR}`,
    POR_ID: `/${base}/${POR_ID}`,
    ATUALIZAR: `/${base}/${ATUALIZAR}`,
    EXCLUIR: `/${base}/${EXCLUIR}`,
  };
}

export const ROTA = {
  CONCURSO: gerarRotaSistema(CONCURSO.ALIAS),
};
