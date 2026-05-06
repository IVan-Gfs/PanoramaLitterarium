import { useState } from "react";
import { USUARIO } from "../constant/usuario.constants"
import type { ErrosUsuario, Perfil, Usuario } from "../type/Usuario";
import { apiPostUsuario } from "../api/usuario.api";

export const useCriar = () => {

    const [model, setModel] = useState<Usuario>(USUARIO.DADOS_INICIAIS);

    const [errors, setErrors] = useState<ErrosUsuario>({});

    const handleChangeField = (name: keyof Usuario, value: string) => {
        setModel((prev) => ({ ...prev, [name]: value }));
        console.log("mudou: "+model.email)
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
            [`${name}Mensagem`]: undefined,
        }));
    };

  const validateField = (
    name: keyof Usuario,
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    
    let messages: string[] = []
    const value = model[name]


    console.log(name)
    switch (name) {
        case USUARIO.FIELDS.EMAIL:
            if(!value) messages.push(USUARIO.INPUT_ERROR.EMAIL.BLANK)
            if(!value && typeof value !== "string") messages.push(USUARIO.INPUT_ERROR.EMAIL.STRING)
            break;
        case USUARIO.FIELDS.SENHA: 
            if (!value || String(value).trim().length === 0) {
                messages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
            }
            if (String(value).length > 0 && String(value).length < 8) {
                messages.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);
            }
            break;
        default:
            break;
    }

    setErrors((prev) => ({
            ...prev,
            [name]: messages.length > 0,
            [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
        }));

        console.log(errors)
  }

  const validarFormulario = (): boolean => {
    const newErrors: ErrosUsuario = {};
    let isFormValid = true;

    const EmailMessages = [];

    if (!model.email) {
      EmailMessages.push(USUARIO.INPUT_ERROR.EMAIL.VALID);
    }
    if (model.senha && typeof model.senha !== "string") {
      EmailMessages.push(USUARIO.INPUT_ERROR.EMAIL.STRING);
    }
    if (EmailMessages.length > 0) {
      newErrors.email = true;
      newErrors.emailMensagem = EmailMessages;
      isFormValid = false;
    }

    
    const senhaMessages = [];

    if (!model.senha || model.senha.trim().length === 0) {
      senhaMessages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
    }
    if (model.senha) {
      if (model.senha.length > 0 && model.senha.length < 8) {
        senhaMessages.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);
      }
    }
    if (senhaMessages.length > 0) {
      newErrors.senha = true;
      newErrors.senhaMensagem = senhaMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  }

  const onSubmitForm = async (e: any) => {
    // não deixa executar o processo normal
    e.preventDefault();

    if (!validarFormulario()) {
      console.log("Erro na digitação os dados ");
      return;
    }

    if (!model) {
      return;
    }

    try {
      const response = apiPostUsuario(model);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    model,
    errors,
    handleChangeField,
    validateField,
    validarFormulario,
    onSubmitForm,
  }
}   