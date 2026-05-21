
const ENTITY_NAME = "participante";
export const  PARTICIPANTE = {
        ENTITY: ENTITY_NAME,
        ALIAS: "participante",
        DADOS_INICIAIS: {
            id: "",
            pseudonimo: ""
        },
        FIELDS: {
           PSEUDONIMO: "perfil.participante.pseudonimo"
        },
        
        INPUT_ERROR: {
            PSEUDONIMO: {
            BLANK: `O pseudônimo do ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `O pseudônimo do ${ENTITY_NAME} deve ter no máximo 50 caracteres`,
            MIN_LEN: `O pseudônimo do ${ENTITY_NAME} deve ter no mínimo 3 caracteres ` 
            }
        }
        


}