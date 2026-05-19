import type { Jurado } from "../../jurado/type/Jurado"
import type { Organizacao } from "../../organizacao/type/Organizacao"
import type { Participante } from "../../participante/type/Participante"

export interface Usuario {
  id?: string,
  email?: string,
  senha?: string,
  roles: string[],
  perfil?: Perfil
}

export interface Perfil {
  id?: string,
  nome?: string,
  foto?: string,
  cpf?: string,
  tel?: string,
  organizacao?: Organizacao,
  participante?: Participante,
  jurado?: Jurado

}

export interface ErrosUsuario {
  
  nome?: boolean,
  email?: boolean,
  senha?: boolean,
  confirmar_senha?: boolean,
  nomeOrganizacacao?: boolean,

  confirmar_senhaMensagem?: string[], 
  nomeMensagem?: string[],
  nomeOrganizacao?: string[],
  emailMensagem?: string[],
  senhaMensagem?: string[],
}