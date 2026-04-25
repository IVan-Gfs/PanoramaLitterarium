
import { CONCURSO } from "../entities/concurso/constants/concurso.constants";

export const ROTA_SISTEMA = `panorama-litterarium/api/v1`;
export const DASHBOARD = `dashboard`;

const LISTAR = `list`;
const CRIAR = "create";
const POR_ID = `get`;
const ATUALIZAR = `update`;
const EXCLUIR = `delete`;

function gerarRotaSistema(entity: string, folder?: string) {
  const base = `${ROTA_SISTEMA}/${entity}`;
  const base_path = `uploads/${folder}`;
  return {
    LISTAR: `/${base}/${LISTAR}`,
    CRIAR: `/${base}/${CRIAR}`,
    POR_ID: `/${base}/${POR_ID}`,
    ATUALIZAR: `/${base}/${ATUALIZAR}`,
    EXCLUIR: `/${base}/${EXCLUIR}`,
    IMAGE_PATH: `/${base_path}/`,
  };
}

export const ROTA = {
  CONCURSO: gerarRotaSistema(CONCURSO.ALIAS, CONCURSO.UPLOAD_FOLDER),
};
