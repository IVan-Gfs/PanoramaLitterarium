
const ENTITY_NAME = "organização";
export const  ORGANIZACAO = {
        ENTITY: ENTITY_NAME,
        ALIAS: "organizacao",
        DADOS_INICIAIS: {
            id: "",
            nomeFantasia: "",
            razaoSocial: "",
            tipo: "",
            cep: "",
            endereco: "",
            municipio: "",
            uf: ""
        },
        FIELDS: {
            NOME_FANTASIA: "perfil.organizacao.nomeFantasia",
            RAZAO_SOCIAL: "perfil.organizacao.razaoSocial",
            TIPO: "perfil.organizacao.tipo",
            CEP: "perfil.organizacao.cep",
            ENDERECO: "perfil.organizacao.endereco",
            MUNICIPIO: "perfil.organizacao.municipio",
            UF: "perfil.organizacao.uf"
        },
        
        INPUT_ERROR: {
            NOME_FANTASIA: {
            BLANK: `O nome da ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `O nome da ${ENTITY_NAME} deve ter no máximo 200 caracteres`,
            MIN_LEN: `O nome da ${ENTITY_NAME} deve ter no mínimo 40 caracteres ` 
            },
            RAZAO_SOCIAL: {
            BLANK: `A razão social de ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `A razão social da ${ENTITY_NAME} deve ter no máximo 200 caracteres`,
            MIN_LEN: `A razão social da ${ENTITY_NAME} deve ter no mínimo 40 caracteres `,
            STRING: `A razão social da ${ENTITY_NAME} deve ser um texto`,
            },
            CEP: {
            BLANK: `O cep da ${ENTITY_NAME} deve ser informado`,
            VALID: `Informe um cep válido para ${ENTITY_NAME}`,
            NUMBER: `Deve conter apenas números`
            },
            TIPO : {
                BLANK: `O tipo da ${ENTITY_NAME} deve ser informado`,
            }
        }
        


}