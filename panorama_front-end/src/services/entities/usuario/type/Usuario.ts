// ─────────────────────────────────────────────
// ErrosUsuario — chaves alinhadas com USUARIO.FIELDS
// Usamos Record<string, any> como base para permitir
// acesso dinâmico via errors[USUARIO.FIELDS.PERFIL.NOME],
// mas declaramos as chaves conhecidas para type-safety.
// ─────────────────────────────────────────────

export interface Usuario {
  id?: string;
  email?: string;
  senha?: string;
  roles: string[];
  perfil?: Perfil;
}

export interface Perfil {
  id?: string;
  nome?: string;
  foto?: string;
  cpf?: string;
  tel?: string;
  organizacao?: Organizacao;
  participante?: Participante;
  jurado?: Jurado;
}

export interface Organizacao {
  nomeFantasia?: string;
  razaoSocial?: string;
  tipo?: string;
  cep?: string;
  endereco?: string;
  municipio?: string;
  uf?: string;
}

export interface Participante {
  pseudonimo?: string;
}

export interface Jurado {
  profissao?: string;
  formacao?: string;
}

// ─────────────────────────────────────────────
// ErrosUsuario
//
// As chaves de erro seguem o mesmo dot-notation dos FIELDS
// ─────────────────────────────────────────────
export interface ErrosUsuario {
  // campos booleanos (true = campo tem erro)
  "perfil.nome"?: boolean;
  "email"?: boolean;
  "senha"?: boolean;
  "confirmar_senha"?: boolean;
  "perfil.organizacao.nomeFantasia"?: boolean;
  "perfil.organizacao.tipo"?: boolean;
  "perfil.participante.pseudonimo"?: boolean;
  "perfil.jurado.profissao"?: boolean;
  "perfil.jurado.formacao"?: boolean;

  // mensagens correspondentes (mesmo nome + "Mensagem")
  "perfil.nomeMensagem"?: string[];
  "emailMensagem"?: string[];
  "senhaMensagem"?: string[];
  "confirmar_senhaMensagem"?: string[];
  "perfil.organizacao.nomeFantasiaMensagem"?: string[];
  "perfil.organizacao.tipoMensagem"?: string[];
  "perfil.participante.pseudonimoMensagem"?: string[];
  "perfil.jurado.profissaoMensagem"?: string[];
  "perfil.jurado.formacaoMensagem"?: string[];

  // índice genérico para acesso dinâmico sem erro de TS
  [key: string]: boolean | string[] | undefined;
}