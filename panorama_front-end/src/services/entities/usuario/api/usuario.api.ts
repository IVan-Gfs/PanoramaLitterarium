import api from "../../../axios/config.axios";
import { ROTA } from "../../../router/url";
import type { Usuario } from "../type/Usuario";



export const apiPostUsuario = async (usuario: Usuario) => {
  const response = await api.post(ROTA.USUARIO.CRIAR, usuario);
  return response;
};
