export function criarMensagemOperacao(ENTITY_NAME: string) {
  return {
    CRIAR: {
      ACAO: `Criar novo cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi criado no sistema`,
      ERRO: `Falha no cadastro de ${ENTITY_NAME} no sistema `,
      EXISTE: `${ENTITY_NAME} já está cadastrado no sistema`,
      CANCELAR: `Foi cancelado o cadastro de ${ENTITY_NAME} no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    ATUALIZAR: {
      ACAO: `Atualizar o cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi atualizado no sistema`,
      ERRO: `Falha na atualização do cadastro de ${ENTITY_NAME} no sistema `,
      NAO_EXISTE: `${ENTITY_NAME} não está cadastrado no sistema`,
      CANCELAR: `Foi cancelado a alteração do cadastro de ${ENTITY_NAME} no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    POR_ID: {
      ACAO: `Mostrar o cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi localizado no sistema`,
      ERRO: `Falha na localização do cadastro de ${ENTITY_NAME} no sistema `,
      NAO_EXISTE: `${ENTITY_NAME} não está cadastrado no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    EXCLUIR: {
      ACAO: `Excluir o cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi excluído no sistema`,
      ERRO: `Falha na exclusão do cadastro de ${ENTITY_NAME} no sistema `,
      NAO_EXISTE: `${ENTITY_NAME} não está cadastrado no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    LISTAR: {
      ACAO: `Lista de ${ENTITY_NAME} cadastrada no sistema`,
      SUCESSO: `A consulta dos  cadastro de ${ENTITY_NAME} foi realizado com sucesso`,
      ERRO: `Falha na consulta do cadastro de ${ENTITY_NAME} no sistema `,
    },
  };
}