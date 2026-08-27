import type { AxiosResponse } from "axios";
import api from "../../../axios/config.axios";
import { ROTA } from "../../../router/url";
import type { UsuarioLogin } from "../type/Auth";
import type { Usuario } from "../type/Usuario";


export const loginUsuario = async (login: UsuarioLogin) => {
  const response = await api.post(ROTA.AUTH.LOGIN, login);
  console.log(response)
  return response;
  
}

export const logoutUsuario = async (): Promise<AxiosResponse> => {
  const response = await api.post(ROTA.AUTH.LOGOUT)
  return response;
}

export const apiPostUsuario = async (usuario: Usuario) => {
  const response = await api.post(ROTA.USUARIO.CRIAR, usuario);
  return response;
};

