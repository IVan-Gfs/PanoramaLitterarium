
const ENTITY_NAME = "Jurado";
export const  JURADO = {
        ENTITY: ENTITY_NAME,
        ALIAS: "jurado",
        DADOS_INICIAIS: {
            id: "",
            formacao: "",
            profissao: "",
        },
        FIELDS: {
           FORMACAO: "perfil.jurado.formacao",
           PROFISSAO: "perfil.jurado.profissao",
        },
        
        INPUT_ERROR: {
            FORMACAO: {
                BLANK: `A formação do ${ENTITY_NAME} deve ser informado`,
                MAX_LEN: `A formação do ${ENTITY_NAME} deve ter no máximo 100 caracteres`,
                MIN_LEN: `A formação de ${ENTITY_NAME} deve ter no mínimo 20 caracteres ` 
            }
        }
        


}