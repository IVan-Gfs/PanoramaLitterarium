
const ENTITY_NAME = "Usuario";
export const  USUARIO = {
        ENTITY: ENTITY_NAME,
        ALIAS: "usuario",
        DADOS_INICIAIS: {
            idUsuario: "",
            nomeUsuario: "",
            emailUsuario: "",
            senhaUsuario: "",
            fotoUsuario: "", 
            tipoUsuario: "",
            cpfUsuario: "",
            cnpjUsuario: "",
            telUsuario: ""
        },
        FIELDS: {
            NOME: "nomeUsuario",
            EMAIL: "emailUsuario",
            SENHA: "senhaUsuario",
            FOTO: "fotoUsuario",
            CPF: "cpfUsuario",
            CNPJ: "cpnjUsuario",
            TEL: "telUsuario"
        },
        INPUT_ERROR: {
            NOME: {
            BLANK: `O nome de ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `O nome de ${ENTITY_NAME} deve ter no máximo 100 caracteres`,
            MIN_LEN: `O nome de ${ENTITY_NAME} deve ter no mínimo 8 caracteres ` 
            },
            EMAIL: {
            BLANK: `O email de ${ENTITY_NAME} deve ser informado`,
            MAX_LEN: `O email da ${ENTITY_NAME} deve ter no máximo 240 caracteres`,
            MIN_LEN: `O email da ${ENTITY_NAME} deve ter no mínimo 20 caracteres `,
            STRING: `O email da ${ENTITY_NAME} deve ser um texto`,
            },
            SENHA:{
                BLANK: `A senha de ${ENTITY_NAME} deve ser informado`,
                MIN_LEN: `a senha de ${ENTITY_NAME} deve ter no mínimo 8 caracteres `,
                STRING: `a senha deve conter letras e números`
            },
            CPF: {
                BLANK: `O CPF deve ser informado`,
                VALID: `Informe um CPF válido`,
                NUMBER: `O CPF deve conter apenas números`
            },
            CNPJ: {
                BLANK: `O CNPJ deve ser informado`,
                VALID: `Informe um CNPJ válido`,
                NUMBER: `O CNPJ deve conter apenas números`
            }
        }


}