export interface Usuario {
  idUsuario?: string,
  nomeUsuario?: string,
  emailUsuario?: string,
  senhaUsuario?: string,
  fotoUsuario?: string, 
  tipoUsuario?: string,
  cpfUsuario?: string,
  cnpjUsuario?: string,
  telUsuario?: string
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