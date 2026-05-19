import { useState } from "react";
import { USUARIO } from "../constant/usuario.constants";
import type { ErrosUsuario, Usuario } from "../type/Usuario";
import { apiPostUsuario } from "../api/usuario.api";

// ─────────────────────────────────────────────
// Helpers para objetos aninhados via dot-notation
// Ex: getNestedValue(obj, "perfil.nome") → obj.perfil.nome
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

const getNestedValue = (obj: any, path: string): any =>
  path.split(".").reduce((acc, part) => acc?.[part], obj);

// ─────────────────────────────────────────────
// Regex de e-mail (formato básico RFC-like)
// ─────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─────────────────────────────────────────────
// Estado do ciclo de envio do formulário
// ─────────────────────────────────────────────
type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─────────────────────────────────────────────
// Model interno do formulário.
// Estende Usuario com confirmar_senha (só existe no front).
// Os sub-objetos de perfil (organizacao, participante, jurado)
// são preenchidos dinamicamente pelo setNestedValue.
// ─────────────────────────────────────────────
interface FormModel extends Usuario {
  confirmar_senha?: string;
}

const DADOS_INICIAIS_FORM: FormModel = {
  ...USUARIO.DADOS_INICIAIS,
  confirmar_senha: "",
};

export const useCriar = () => {
  const [model, setModel] = useState<FormModel>(DADOS_INICIAIS_FORM);
  const [errors, setErrors] = useState<ErrosUsuario>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // ─────────────────────────────────────────────
  // Atualiza um campo no model e limpa seus erros
  // ─────────────────────────────────────────────
  const handleChangeField = (name: string, value: string) => {
    console.log(value)
    setModel((prev) => {
      // Copia rasa do topo + perfil para não mutar o state
      const next: FormModel = { ...prev, perfil: { ...prev.perfil } };
      setNestedValue(next, name, value);
      return next;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Mensagem`]: undefined,
    }));

    // Quando senha ou confirmar_senha muda, limpa os dois campos
    // para não deixar a mensagem "senhas não conferem" obsoleta
    if (name === USUARIO.FIELDS.SENHA || name === USUARIO.FIELDS.CONFIRMAR_SENHA) {
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
  // Valida campo individual ao perder o foco (onBlur)
  // ─────────────────────────────────────────────
  const validateField = (
    name: string,
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const messages: string[] = [];
    // confirmar_senha é campo raiz do FormModel; demais via dot-notation
    const value =
      name === USUARIO.FIELDS.CONFIRMAR_SENHA
        ? model.confirmar_senha
        : getNestedValue(model, name);

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

        // Revalida igualdade se confirmar já foi preenchido
        if (model.confirmar_senha && value !== model.confirmar_senha)
          messages.push(USUARIO.INPUT_ERROR.SENHA.NOT_EQUAL);
        break;
      }

      case USUARIO.FIELDS.CONFIRMAR_SENHA: {
        if (!value || String(value).trim().length === 0)
          messages.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
        else if (value !== model.senha)
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
  // Valida o formulário inteiro antes de enviar.
  // Recebe o tipoConta para validar campos específicos.
  // ─────────────────────────────────────────────
  const validarFormulario = (tipo: string | undefined): boolean => {
    const newErrors: ErrosUsuario = {};
    let isValid = true;

    // — Nome —
    const nome = model.perfil?.nome;
    if (!nome || nome.trim() === "") {
      newErrors[USUARIO.FIELDS.PERFIL.NOME] = true;
      newErrors[`${USUARIO.FIELDS.PERFIL.NOME}Mensagem`] = [
        USUARIO.INPUT_ERROR.PERFIL.NOME.BLANK,
      ];
      isValid = false;
    }

    // — E-mail —
    const emailMsgs: string[] = [];
    if (!model.email || model.email.trim() === "")
      emailMsgs.push(USUARIO.INPUT_ERROR.EMAIL.BLANK);
    else if (!EMAIL_REGEX.test(model.email))
      emailMsgs.push(USUARIO.INPUT_ERROR.EMAIL.VALID);
    if (emailMsgs.length > 0) {
      newErrors["email"] = true;
      newErrors["emailMensagem"] = emailMsgs;
      isValid = false;
    }

    // — Senha —
    const senhaMsgs: string[] = [];
    if (!model.senha || model.senha.trim().length === 0)
      senhaMsgs.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
    else if (model.senha.length < 8)
      senhaMsgs.push(USUARIO.INPUT_ERROR.SENHA.MIN_LEN);
    if (senhaMsgs.length > 0) {
      newErrors[USUARIO.FIELDS.SENHA] = true;
      newErrors[`${USUARIO.FIELDS.SENHA}Mensagem`] = senhaMsgs;
      isValid = false;
    }

    // — Confirmar senha —
    const confirmarMsgs: string[] = [];
    if (!model.confirmar_senha || model.confirmar_senha.trim().length === 0)
      confirmarMsgs.push(USUARIO.INPUT_ERROR.SENHA.BLANK);
    else if (model.confirmar_senha !== model.senha)
      confirmarMsgs.push(USUARIO.INPUT_ERROR.SENHA.NOT_EQUAL);
    if (confirmarMsgs.length > 0) {
      newErrors[USUARIO.FIELDS.CONFIRMAR_SENHA] = true;
      newErrors[`${USUARIO.FIELDS.CONFIRMAR_SENHA}Mensagem`] = confirmarMsgs;
      isValid = false;
    }

    // — Campos por tipo de conta —
    if (tipo === "organizacao") {
      const nomeFantasia = model.perfil?.organizacao?.nomeFantasia;
      if (!nomeFantasia || nomeFantasia.trim() === "") {
        newErrors["perfil.organizacao.nomeFantasia"] = true;
        newErrors["perfil.organizacao.nomeFantasiaMensagem"] = [
          "O nome da organização deve ser informado",
        ];
        isValid = false;
      }
    }

    if (tipo === "participante") {
      const pseudonimo = model.perfil?.participante?.pseudonimo;
      if (!pseudonimo || pseudonimo.trim() === "") {
        newErrors["perfil.participante.pseudonimo"] = true;
        newErrors["perfil.participante.pseudonimoMensagem"] = [
          "O pseudônimo deve ser informado",
        ];
        isValid = false;
      }
    }

    if (tipo === "jurado") {
      const profissao = model.perfil?.jurado?.profissao;
      if (!profissao || profissao.trim() === "") {
        newErrors["perfil.jurado.profissao"] = true;
        newErrors["perfil.jurado.profissaoMensagem"] = [
          "A profissão deve ser informada",
        ];
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // ─────────────────────────────────────────────
  // Monta o payload exato que o back-end espera.
  //
  // {
  //   "email": "...", "senha": "...", "roles": ["ORGANIZACAO"],
  //   "perfil": {
  //     "nome": "...", "tel": "...",
  //     "organizacao": { "nomeFantasia": "...", "tipo": "..." }
  //   }
  // }
  //
  // • confirmar_senha NUNCA vai no payload
  // • O perfil inclui apenas o sub-objeto do tipo ativo
  // ─────────────────────────────────────────────
  const montarPayload = (tipo: string | undefined): Usuario => {
    const perfilBase: Usuario["perfil"] = {
      nome: model.perfil?.nome,
      tel: model.perfil?.tel,
    };

    if (tipo === "organizacao" && model.perfil?.organizacao) {
      perfilBase.organizacao = { ...model.perfil.organizacao };
    } else if (tipo === "participante" && model.perfil?.participante) {
      perfilBase.participante = { ...model.perfil.participante };
    } else if (tipo === "jurado" && model.perfil?.jurado) {
      perfilBase.jurado = { ...model.perfil.jurado };
    }

    return {
      email: model.email,
      senha: model.senha,
      roles: [tipo ? tipo.toUpperCase() : ""],
      perfil: perfilBase,
    };
  };

  // ─────────────────────────────────────────────
  // Submit do formulário
  // ─────────────────────────────────────────────
  const onSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>,
    tipo: string | undefined
  ) => {
    e.preventDefault();
    setServerError(null);

    if (!validarFormulario(tipo)) return;

    setSubmitStatus("loading");

    const payload = montarPayload(tipo);
    console.log("Payload enviado:", JSON.stringify(payload, null, 2));

    try {
      await apiPostUsuario(payload);
      setSubmitStatus("success");
    } catch (error: any) {
      setSubmitStatus("error");
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
    onSubmitForm,
  };
};