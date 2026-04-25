
import { criarMensagemOperacao } from "../../../constants/mensagem.operacao";
import type {Concurso } from "../type/Concurso";

const ENTITY_NAME = "Concurso";

export const CONCURSO = {
  ENTITY: ENTITY_NAME,
  UPLOAD_FOLDER: "concursos", // Para construção da URL de acesso à imagem de capa
  ALIAS: "contests",

  DADOS_INCIAIS: {
    id: 0,
    titulo: "",
    descricao: "",
    dataInicio: "",
    dataFim: "",
    organizacao: {
      id: 0,
      nomeFantasia: "",
      tipo: "",
    },
  },

  FIELDS: {
    ID: "id",
    TITULO: "titulo",
    DESCRICAO: "descricao",
    PRAZO_INSCRICAO: "prazoInscricao",
    IMAGEM_CAPA: "imgCapa",
    GENERO_LITERARIO: "generoLiterario",
  } as const,

  LABEL: {
    TITULO: "Título",
    DESCRICAO: "Descrição",
    PRAZO_INSCRICAO: "Prazo de Inscrição",
    IMAGEM_CAPA: "Imagem de Capa",
    GENERO_LITERARIO: "Gênero Literário",
  },

  TITULO: {
    LISTA: `Lista de ${ENTITY_NAME}`,
    CRIAR: `Nova ${ENTITY_NAME}`,
    ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
    EXCLUIR: `Excluir ${ENTITY_NAME}`,
    CONSULTAR: `Consultar ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para ${ENTITY_NAME}`,
    },
    TITULO: {
      BLANK: `O título de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código válido para ${ENTITY_NAME}`,
      MAX_LEN: `O código de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `O código de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `O código de ${ENTITY_NAME} deve ser um texto`,
    },
    DESCRICAO: {
      BLANK: `A descrição de ${ENTITY_NAME} deve ser informada`,
      VALID: `Informe uma descrição válida para ${ENTITY_NAME}`,
      MAX_LEN: `A descrição de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `A descrição de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `A descrição de ${ENTITY_NAME} deve ser um texto`,
    },
    PRAZO_INSCRICAO:{
        BLANK: `O prazo de inscrição de ${ENTITY_NAME} deve ser informado`,
        VALID: `Informe um prazo de inscrição válido para ${ENTITY_NAME}`,
    },
    IMAGEM_CAPA: {
      BLANK: `A imagem de capa de ${ENTITY_NAME} deve ser informada`,
      VALID: `Informe uma imagem de capa válida para ${ENTITY_NAME}`,
    },
    GENERO_LITERARIO: {
      BLANK: `O gênero literário de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um gênero literário válido para ${ENTITY_NAME}`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};

export const fieldsConcurso: (keyof Concurso)[] = [
  CONCURSO.FIELDS.ID,
  CONCURSO.FIELDS.TITULO,
  CONCURSO.FIELDS.DESCRICAO,
  CONCURSO.FIELDS.PRAZO_INSCRICAO,
  CONCURSO.FIELDS.IMAGEM_CAPA,
  CONCURSO.FIELDS.GENERO_LITERARIO,

];

export const mapaCampoParaMensagem: Record<
  keyof Concurso,
  keyof typeof CONCURSO.INPUT_ERROR
> = {
  id: "ID",
  titulo: "TITULO",
  descricao: "DESCRICAO",
  prazoInscricao: "PRAZO_INSCRICAO",
  imgCapa: "IMAGEM_CAPA",
  generoLiterario: "GENERO_LITERARIO",
};
