import api from "../../../axios/config.axios";
import { ROTA } from "../../../router/url";
import type { UsuarioLogin } from "../type/Auth";
import type { Usuario } from "../type/Usuario";


export const loginUsuario = async (login: UsuarioLogin) => {
  const response = await api.post(ROTA.USUARIO.LOGIN, login);
  return response;
}

export const apiPostUsuario = async (usuario: Usuario) => {
  const response = await api.post(ROTA.USUARIO.CRIAR, usuario);
  return response;
};

