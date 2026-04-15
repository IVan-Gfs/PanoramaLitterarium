import { useState } from "react";
import { USUARIO } from "../entities/usuario/usuario.constants"
import type { ErrosUsuario, Usuario } from "../entities/usuario/type/Usuario";

export const useCriar = () => {

    const [model, setModel] = useState<Usuario>(USUARIO.DADOS_INICIAIS);

    const [errors, setErrors] = useState<ErrosUsuario>({});

    const handleChangeField = (name: keyof Usuario, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Mensagem`]: undefined,
    }));
  };

  const validarField = (): boolean =>{
    const newErrors: ErrosUsuario = {};
    let isFormValid = true;

    const nomeUsuarioMessages = [];

    if(!model.nomeUsuario || model.nomeUsuario.trim().length === 0){
        nomeUsuarioMessages.push(USUARIO.INPUT_ERROR.NOME.BLANK)
    }
    return isFormValid;
  }
  return {
    model,
    errors,
    handleChangeField,
  }
}   