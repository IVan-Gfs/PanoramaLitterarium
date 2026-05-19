
const ENTITY_NAME = "Participante";
export const  PARTICIPANTE = {
        ENTITY: ENTITY_NAME,
        ALIAS: "participante",
        DADOS_INICIAIS: {
            id: "",
            pseudonimo: ""
        },
        FIELDS: {
           PSEUDONIMO: "participante.pseudonimo"
        },
        
        INPUT_ERROR: {
            PSEUDONIMO: {
            BLANK: `O nome pseudônimo da ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `O nome pseudônimo de ${ENTITY_NAME} deve ter no máximo 50 caracteres`,
            MIN_LEN: `O nome fantasia de ${ENTITY_NAME} deve ter no mínimo 3 caracteres ` 
            }
        }
        


}