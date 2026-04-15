
const ENTITY_NAME = "Organização";
export const  ORGNIZACAO = {
        ENTITY: ENTITY_NAME,
        ALIAS: "organizacao",
        DADOS_INICIAIS: {
            idOrg: "",
            nomeFantasia: "",
            razaoSocial: "",
            tipoOrg: "",
            cepOrg: "",
            enderecoOrg: "",
            municipioOrg: "",
            ufOrg: ""
        },
        FIELDS: {
            NOME_FANTASIA: "nomeFantasia",
            RAZAO_SOCIAL: "razaoSocial",
            TIPO: "tipoOrg",
            CEP: "cepOrg",
            ENDERECO: "enderecoOrg",
            MUNICIPIO: "municipioOrg",
            UF: "ufOrg"
        },
        
        INPUT_ERROR: {
            NOME_FANTASIA: {
            BLANK: `O nome fantasia da ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `O nome fantasia de ${ENTITY_NAME} deve ter no máximo 200 caracteres`,
            MIN_LEN: `O nome fantasia de ${ENTITY_NAME} deve ter no mínimo 40 caracteres ` 
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
        }
        


}