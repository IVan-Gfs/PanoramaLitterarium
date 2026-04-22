import { criarMensagemOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Concurso';



export const CONCURSO = {
  ENTITY: ENTITY_NAME,
  
  TABLE: 'concursos',

  TABLE_FIELDS:{
    ID: 'id',
    NOME: 'nome',
    DESCRICAO: 'descricao',
    DATA_INICIO: 'data_inicio',
    DATA_FIM: 'data_fim',
    STATUS: 'status',
    DATA_PUBLICACAO: 'createdAt',
  },

  ALIAS: 'CONC',

  FIELDS:{
    DATA_PUBLICACAO: 'createdAt',
    ID: 'id',
    TITULO: 'titulo',
    DATA_INICIO: 'data_inicio',
    DATA_FIM: 'data_fim',
    STATUS: 'status',
  },

  INPUT_ERROR: {
    ID:{
      BLANK: `Código de ${ENTITY_NAME} deve ser informado`,
      VALID: `Código de identificador único deve ser válido para ${ENTITY_NAME}`,
    },
    },
    OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};

export const fieldsConcurso = Object.values(CONCURSO.FIELDS);