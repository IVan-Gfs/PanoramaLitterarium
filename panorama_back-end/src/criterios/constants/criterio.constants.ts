import { criarMensagemOperacao } from '../../commons/constants/constants.entity';

const ENTITY_NAME = 'Critérios Avaliativos';



export const CRITERIO = {
  ENTITY: ENTITY_NAME,
  
  TABLE: 'concursos',

  TABLE_FIELDS:{
    ID: 'id',
    TITULO: 'nome',
  },

  ALIAS: 'criteria',
  ALIAS_GROUPS: 'criteria-groups',

  FIELDS_SEARCH:{ //campos permitidos para fazer a busca
    NOME: 'nome',
  },

  FIELDS_ORDER: { //campos permitidos para fazer a busca
     NOME: 'nome',
  },

  INPUT_ERROR: {
    ID:{
      BLANK: `Código de ${ENTITY_NAME} deve ser informado`,
      VALID: `Código de identificador único deve ser válido para ${ENTITY_NAME}`,
    },
    },
    OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};

export const searchFieldsCriterio = Object.values(CRITERIO.FIELDS_SEARCH);
export const orderFieldsCriterio = Object.values(CRITERIO.FIELDS_ORDER);