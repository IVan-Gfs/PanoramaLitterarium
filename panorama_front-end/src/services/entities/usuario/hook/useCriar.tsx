import { useState } from "react";
import { USUARIO } from "../constant/usuario.constants";
import type { ErrosUsuario, Usuario } from "../type/Usuario";
import { apiPostUsuario } from "../api/usuario.api";

// ─────────────────────────────────────────────
// Helpers para leitura e escrita em objetos aninhados
// Ex: "perfil.nome" acessa obj.perfil.nome
// ─────────────────────────────────────────────

const setNestedValue = (obj: any, path: string, value: any) => {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const deep = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
  deep[lastKey] = value;
};

const getNestedValue = (obj: any, path: string) =>
  path.split(".").reduce((acc, part) => acc?.[part], obj);

// ─────────────────────────────────────────────
// Regex de validação de e-mail (formato básico)
// ─────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─────────────────────────────────────────────
// Tipo do estado de envio do formulário
// ─────────────────────────────────────────────
type SubmitStatus = "idle" | "loading" | "success" | "error";

export const useCriar = () => {
  // Estado principal do modelo de usuário
  const [model, setModel] = useState<Usuario>(USUARIO.DADOS_INICIAIS);

  // Estado dos erros por campo (chave = field, valor = bool de erro + mensagem)
  const [errors, setErrors] = useState<ErrosUsuario>({});

  // Estado do processo de envio: idle | loading | success | error
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  // Mensagem de erro vinda do servidor (ex: "Email já cadastrado")
  const [serverError, setServerError] = useState<string | null>(null);

  // ─────────────────────────────────────────────
  // Atualiza um campo no model e limpa seus erros
  // ─────────────────────────────────────────────
  const handleChangeField = (name: string, value: string) => {
    setModel((prev) => {
      const newModel = { ...prev };
      setNestedValue(newModel, name, value);
      return newModel;
    });

    // Limpa os erros do campo editado
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Mensagem`]: undefined,
    }));

    // Se o campo alterado é senha ou confirmarSenha,
    // também limpa o erro do campo irmão para evitar mensagem obsoleta
    if (
      name === USUARIO.FIELDS.SENHA ||
      name === USUARIO.FIELDS.CONFIRMAR_SENHA
    ) {
      setErrors((prev) => ({
        ...prev,
        [USUARIO.FIELDS.SENHA]: undefined,
        [`${USUARIO.FIELDS.SENHA}Mensagem`]: undefined,
        [USUARIO.FIELDS.CONFIRMAR_SENHA]: undefined,
        [`${USUARIO.FIELDS.CONFIRMAR_SENHA}Mensagem`]: undefined,
      }));
    }
  };

  // ─────────────────────────────────────────────
  // Valida um campo individual ao perder o foco (onBlur)
  // ─────────────────────────────────────────────
  const validateField = (
    name: string,
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const messages: string[] = [];
    const value = getNestedValue(model, name);

    switch (name) {
      case USUARIO.FIELDS.PERFIL.NOME:
        if (!value || String(value).trim() === "")
          messages.push(USUARIO.INPUT_ERROR.PERFIL.NOME.BLANK);
        break;

      case USUARIO.FIELDS.EMAIL:
        if (!value || String(value).trim() === "")
          messages.push(USUARIO.INPUT_ERROR.EMAIL.BLANK);
        else if (!EMAIL_REGEX.test(String(value)))
          messages.push(USUARIO.INPUT_ERROR.EMAIL.VALID);
        break;

      case USUARIO.FIELDS.SENHA: {
        if (!value || String(value).trim().length === 0)
          messages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
        else if (String(value).length < 8)
          messages.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);

        // Se confirmarSenha já foi preenchido, revalida igualdade
        const confirmar = getNestedValue(model, USUARIO.FIELDS.CONFIRMAR_SENHA);
        if (confirmar && value !== confirmar)
          messages.push(USUARIO.INPUT_ERROR.SENHA.NOT_EQUAL);
        break;
      }

      case USUARIO.FIELDS.CONFIRMAR_SENHA: {
        // Lê a senha atual do model para comparar
        const senha = getNestedValue(model, USUARIO.FIELDS.SENHA);

        if (!value || String(value).trim().length === 0)
          messages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
        else if (value !== senha)
          messages.push(USUARIO.INPUT_ERROR.SENHA.NOT_EQUAL);
        break;
      }

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
    }));
  };

  // ─────────────────────────────────────────────
  // Valida o formulário inteiro antes de enviar
  // Retorna true se tudo estiver ok
  // ─────────────────────────────────────────────
  const validarFormulario = (): boolean => {
    const newErrors: ErrosUsuario = {};
    let isValid = true;

    // Validação do nome
    const nome = getNestedValue(model, USUARIO.FIELDS.PERFIL.NOME);
    if (!nome || String(nome).trim() === "") {
      newErrors[USUARIO.FIELDS.PERFIL.NOME] = true;
      newErrors[`${USUARIO.FIELDS.PERFIL.NOME}Mensagem`] = [
        USUARIO.INPUT_ERROR.PERFIL.NOME.BLANK,
      ];
      isValid = false;
    }

    // Validação do e-mail
    const email = model.email;
    const emailMsgs: string[] = [];
    if (!email || email.trim() === "")
      emailMsgs.push(USUARIO.INPUT_ERROR.EMAIL.BLANK);
    else if (!EMAIL_REGEX.test(email))
      emailMsgs.push(USUARIO.INPUT_ERROR.EMAIL.VALID);
    if (emailMsgs.length > 0) {
      newErrors.email = true;
      newErrors.emailMensagem = emailMsgs;
      isValid = false;
    }

    // Validação da senha
    const senha = model.senha;
    const senhaMsgs: string[] = [];
    if (!senha || senha.trim().length === 0)
      senhaMsgs.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
    else if (senha.length < 8) senhaMsgs.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);
    if (senhaMsgs.length > 0) {
      newErrors[USUARIO.FIELDS.SENHA] = true;
      newErrors[`${USUARIO.FIELDS.SENHA}Mensagem`] = senhaMsgs;
      isValid = false;
    }

    // Validação da confirmação de senha
    const confirmar = getNestedValue(model, USUARIO.FIELDS.CONFIRMAR_SENHA);
    const confirmarMsgs: string[] = [];
    if (!confirmar || String(confirmar).trim().length === 0)
      confirmarMsgs.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
    else if (confirmar !== senha)
      confirmarMsgs.push(USUARIO.INPUT_ERROR.SENHA.NOT_EQUAL);
    if (confirmarMsgs.length > 0) {
      newErrors[USUARIO.FIELDS.CONFIRMAR_SENHA] = true;
      newErrors[`${USUARIO.FIELDS.CONFIRMAR_SENHA}Mensagem`] = confirmarMsgs;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ─────────────────────────────────────────────
  // Envio do formulário
  // ─────────────────────────────────────────────
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>, tipo: string | undefined) => {
    e.preventDefault();
    setServerError(null);

    // Bloqueia envio se houver erros de validação
    if (!validarFormulario()) return;

    setSubmitStatus("loading");

    if(tipo){
      model.roles[0] = tipo.toUpperCase()
      console.log(model.roles)
    }

    console.log(model)
  
    
    try {
      await apiPostUsuario(model);
      setSubmitStatus("success");
    } catch (error: any) {
      setSubmitStatus("error");

      // Tenta extrair mensagem de erro do servidor
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao cadastrar. Tente novamente.";
      setServerError(msg);
    }
  };

  return {
    model,
    errors,
    submitStatus,
    serverError,
    handleChangeField,
    validateField,
    validarFormulario,
    onSubmitForm,
  };
};