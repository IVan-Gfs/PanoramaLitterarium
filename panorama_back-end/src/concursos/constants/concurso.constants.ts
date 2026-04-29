import { criarMensagemOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Concurso';



export const CONCURSO = {
  ENTITY: ENTITY_NAME,
  
  TABLE: 'concursos',

  TABLE_FIELDS:{
    ID: 'id',
    TITULO: 'titulo',
    DESCRICAO: 'descricao',
    DATA_INICIO: 'data_inicio',
    DATA_FIM: 'data_fim',
    STATUS: 'status',
    DATA_PUBLICACAO: 'createdAt',
  },

  ALIAS: 'CONC',

  FIELDS_SEARCH:{ //campos permitidos para fazer a busca
    TITULO: 'titulo',
    DESCRICAO: 'descricao',
    STATUS: 'status',
  },

  FIELDS_ORDER: { //campos permitidos para fazer a busca
     ID: 'id',
     PRAZO: 'prazoInscricao',
     DATA_PUBLICACAO: 'createdAt',
     DATA_FIM: 'data_fim',
     TITULO: 'titulo',
  },

  INPUT_ERROR: {
    ID:{
      BLANK: `Código de ${ENTITY_NAME} deve ser informado`,
      VALID: `Código de identificador único deve ser válido para ${ENTITY_NAME}`,
    },
    },
    OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};

export const searchFieldsConcurso = Object.values(CONCURSO.FIELDS_SEARCH);
export const orderFieldsConcurso = Object.values(CONCURSO.FIELDS_ORDER);