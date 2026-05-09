import type { Organizacao } from "../../organizacao/type/Organizacao"

export interface Usuario {
  id?: string,
  email?: string,
  senha?: string,
  perfil?: Perfil
}

export interface Perfil {
  id?: string,
  nome?: string,
  foto?: string,
  cpf?: string,
  tel?: string,
  organizacao?: Organizacao

}

export interface ErrosUsuario {
  
  nome?: boolean,
  email?: boolean,
  senha?: boolean,

  nomeMensagem?: string[],
  emailMensagem?: string[],
  senhaMensagem?: string[],
}