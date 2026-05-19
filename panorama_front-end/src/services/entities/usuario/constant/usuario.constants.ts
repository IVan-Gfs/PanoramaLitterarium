import { criarMensagemOperacao } from "../../../constants/mensagem.operacao";
import type { Usuario } from "../type/Usuario";

const ENTITY_NAME = "Usuario";
export const  USUARIO = {
        ENTITY: ENTITY_NAME,
        ALIAS: "users",

        DADOS_INICIAIS: {
            id: "",
            email: "",
            senha: "",
            roles: [""],
            perfil: {
                nome: "",
                foto: "",
                cpf: undefined,
                tel: undefined
            }
        
        },
        FIELDS: {
            ID: "id",
            EMAIL: "email",
            SENHA: "senha",
            CONFIRMAR_SENHA: "confirmar_senha",
            PERFIL: {
                NOME: "perfil.nome",
                FOTO: "perfil.foto",
                CPF: "perfil.cpf",
                TEL: "perfil.tel"
                
            }
        } as const,
        LABEL: {
            EMAIL: "email",
            SENHA: "senha",
        },

        INPUT_ERROR: {
            ID: {},
            EMAIL: {
                BLANK: `O email de ${ENTITY_NAME} deve ser informado`,
                MAX_LEN: `O email da ${ENTITY_NAME} deve ter no máximo 240 caracteres`,
                MIN_LEN: `O email da ${ENTITY_NAME} deve ter no mínimo 20 caracteres `,
                
                VALID: `Informe um código de identificação válido para ${ENTITY_NAME}`,
                
            },
            SENHA:{
                BLANK: `A senha de ${ENTITY_NAME} deve ser informado`,
                NOT_EQUAL:"As senhas não conferem",
                MIN_LEN: `a senha de ${ENTITY_NAME} deve ter no mínimo 8 caracteres `,
                STRING: `a senha deve conter letras e números`
            },
            PERFIL: {
                NOME: {
                    BLANK: `O nome de ${ENTITY_NAME} deve ser informado`,
                    MAX_LEN: `O nome de ${ENTITY_NAME} deve ter no máximo 100 caracteres`,
                    MIN_LEN: `O nome de ${ENTITY_NAME} deve ter no mínimo 8 caracteres `,
                    STRING: `O email da ${ENTITY_NAME} deve ser um texto`,
                },
                DOCUMENTO: {
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
                },
                TEL: {
                        BLANK: `O telefone deve ser informado`,
                        VALID: `Informe um telefone válido`,
                        NUMBER: `Telefone deve conter apenas números`
                }
            },
            
            
        },

        TITULO: {
            LISTA: `Lista de ${ENTITY_NAME}`,
            CRIAR: `Nova ${ENTITY_NAME}`,
            ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
            EXCLUIR: `Excluir ${ENTITY_NAME}`,
            CONSULTAR: `Consultar ${ENTITY_NAME}`,
        },
        
        OPERACAO: criarMensagemOperacao(ENTITY_NAME)
}

export const fieldsUsuario: string[] = [
            USUARIO.FIELDS.ID,
            USUARIO.FIELDS.EMAIL,
            USUARIO.FIELDS.SENHA,
            USUARIO.FIELDS.PERFIL.NOME
];

