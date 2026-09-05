
import { CATEGORIA } from "../entities/categoria/constants/categoria.contants";
import { CONCURSO } from "../entities/concurso/constants/concurso.constants";
import { CRITERIO } from "../entities/criterio/constant/critério.constant";
import { USUARIO } from "../entities/usuario/constant/usuario.constants";

export const ROTA_SISTEMA = `panorama-litterarium/api/v1`;
export const ROTA_AUTH = `panorama-litterarium/api/v1/auth/session`
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
    POR_ID: `/${base}/`,
    ATUALIZAR: `/${base}/${ATUALIZAR}`,
    EXCLUIR: `/${base}/${EXCLUIR}`,
    IMAGE_PATH: `/${base_path}/`,
  };
}
function rotaSistema(entity: string, folder?: string) {
  const base = `${ROTA_SISTEMA}/${entity}`;
  const base_path = `uploads/${folder}`;
  return {
    BASE: `/${base}`,
    IMAGE_PATH: `/${base_path}/`,
  };
}


function gerarRotaAuth(){
    const base = `/${ROTA_AUTH}`;
    return {
      BASE: base,
      LOGIN: `/${ROTA_AUTH}/login`,
      LOGOUT: `/${ROTA_AUTH}/logout`,
    }
}

export const ROTA = {
  CONCURSO: gerarRotaSistema(CONCURSO.ALIAS, CONCURSO.UPLOAD_FOLDER),
  CATEGORIA: gerarRotaSistema(CATEGORIA.ALIAS),
  USUARIO: gerarRotaSistema(USUARIO.ALIAS),
  GRUPO_CRITERIO: rotaSistema(CRITERIO.ALIAS_GROUPS),
  AUTH: gerarRotaAuth()
};
