import type { Organizacao } from "../../organizacao/type/Organizacao"

export interface Usuario {
  id?: string,
  email?: string,
  senha?: string,
  pessoa?: Pessoa
}

export interface Pessoa {
  id?: string,
  nome?: string,
  foto?: string,
  tipo?: string,
  documento?: string,
  tel?: string,
  organizacao?: Organizacao

}

export interface ErrosUsuario {
  idUsuario?: boolean,
  nomeUsuario?: boolean,
  emailUsuario?: boolean,
  senhaUsuario?: boolean,
  fotoUsuario?: boolean, 
  tipoUsuario?: boolean,
  cpfUsuario?: boolean,
  cnpjUsuario?: boolean,
  telUsuario?: boolean

  nomeUsuarioMensagem?: string[],
  emailUsuarioMensagem?: string[],
  senhaUsuarioMensagem?: string[],
  fotoUsuarioMensagem?: string[], 
  tipoUsuarioMensagem?: string[],
  cpfUsuarioMensagem?: string[],
  cnpjUsuarioMensagem?: string[],
  telUsuarioMensagem?: string[]
}