import "../../assets/css/usuario/cadastrar.css";
import "../../assets/css/usuario/LayoutAuth.css";
import "../../assets/css/usuario/cadastroSuccess.css";
import { useCriar } from "../../services/entities/usuario/hook/useCriar";
import { USUARIO } from "../../services/entities/usuario/constant/usuario.constants";
import { ORGANIZACAO } from "../../services/entities/organizacao/constants/org.constants";
import { PARTICIPANTE } from "../../services/entities/participante/constants/participante.constants";
import { JURADO } from "../../services/entities/jurado/constants/jurado.constants";
import { useParams, useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// Componente auxiliar: lista de mensagens de erro
// ─────────────────────────────────────────────
function ErrorMessages({ messages }: { messages?: string[] }) {
  if (!messages || messages.length === 0) return null;
  return (
    <ul className="input-error-list" role="alert" aria-live="polite">
      {messages.map((msg, i) => (
        <li key={i} className="input-message-error">
          {msg}
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────
// Componente principal de cadastro
// ─────────────────────────────────────────────
export default function CadastrarUsuario() {
  const {
    errors,
    submitStatus,
    serverError,
    handleChangeField,
    validateField,
    onSubmitForm,
  } = useCriar();

  console.log(errors)
  const { tipoConta } = useParams();
  const isLoading = submitStatus === "loading";

  // Mostra tela de sucesso após cadastro concluído
  if (submitStatus === "success") {
    return <SuccessScreen />;
  }

  return (
    // onSubmit na <form> — passa tipoConta para o hook montar o payload correto
    <form
      className="authContainer container-cadastro"
      onSubmit={(e) => onSubmitForm(e, tipoConta)}
      noValidate
    >
      <h2 className="title">DADOS DO USUÁRIO</h2>

      <div className="form-grid-cadastro-usuario">

        {/* ── Nome ──
            CORREÇÃO: errors[USUARIO.FIELDS.PERFIL.NOME] resolve para
            errors["perfil.nome"], que agora existe em ErrosUsuario com [key: string].
            Antes falhava porque ErrosUsuario só tinha "nome?: boolean". */}
        <div>
          <label htmlFor="nome">
            <span className="asterisco">*</span>Seu nome:
          </label>
          <input
            id="nome"
            type="text"
            name="perfil.nome"
            className={errors[USUARIO.FIELDS.PERFIL.NOME] ? "input-error" : "input"}
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.PERFIL.NOME, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.PERFIL.NOME, e)}
            required
          />
          <ErrorMessages
            messages={errors[`${USUARIO.FIELDS.PERFIL.NOME}Mensagem`] as string[]}
          />
        </div>

        {/* ── Telefone ── */}
        <div>
          <label htmlFor="tel">Telefone:</label>
          <input
            id="tel"
            type="tel"
            name="perfil.tel"
            className="input"
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.PERFIL.TEL, e.target.value)
            }
          />
        </div>

        {/* ── Campos de Participante ── */}
        {tipoConta === "participante" && (
          <div>
            <label htmlFor="peseudonimo">
              <span className="asterisco">*</span>Pseudônimo:
            </label>
            <input
              id="peseudonimo"
              type="text"
              name="perfil.participante.pseudonimo"
              className={
                errors[PARTICIPANTE.FIELDS.PSEUDONIMO] ? "input-error" : "input"
              }
              onChange={(e) =>
                handleChangeField(PARTICIPANTE.FIELDS.PSEUDONIMO, e.target.value)
              }
              required
            />
            <ErrorMessages
              messages={
                errors[`${PARTICIPANTE.FIELDS.PSEUDONIMO}Mensagem`] as string[]
              }
            />
          </div>
        )}

        {/* ── Campos de Jurado ── */}
        {tipoConta === "jurado" && (
          <>
            <div>
              <label htmlFor="profissao">
                <span className="asterisco">*</span>Profissão:
              </label>
              <input
                id="profissao"
                type="text"
                name="perfil.jurado.profissao"
                className={
                  errors[JURADO.FIELDS.PROFISSAO] ? "input-error" : "input"
                }
                onChange={(e) =>
                  handleChangeField(JURADO.FIELDS.PROFISSAO, e.target.value)
                }
                required
              />
              <ErrorMessages
                messages={
                  errors[`${JURADO.FIELDS.PROFISSAO}Mensagem`] as string[]
                }
              />
            </div>

            <div>
              <label htmlFor="formacao">Formação:</label>
              {/* CORREÇÃO: antes ambos usavam JURADO.FIELDS.PROFISSAO */}
              <input
                id="formacao"
                type="text"
                name="perfil.jurado.formacao"
                className="input"
                onChange={(e) =>
                  handleChangeField(JURADO.FIELDS.FORMACAO, e.target.value)
                }
              />
            </div>
          </>
        )}

        {/* ── Campos de Organização ── */}
        {tipoConta === "organizacao" && (
          <>
            <div>
              <label htmlFor="nomeFantasia">
                <span className="asterisco">*</span>Nome da Organização:
              </label>
              <input
                id="nomeFantasia"
                type="text"
                name="perfil.organizacao.nomeFantasia"
                className={
                  errors[ORGANIZACAO.FIELDS.NOME_FANTASIA] ? "input-error" : "input"
                }
                onChange={(e) =>
                  handleChangeField(
                    ORGANIZACAO.FIELDS.NOME_FANTASIA,
                    e.target.value
                  )
                }
              />
              <ErrorMessages
                messages={
                  errors[`${ORGANIZACAO.FIELDS.NOME_FANTASIA}Mensagem`] as string[]
                }
              />
            </div>

            <div>
              <label htmlFor="tipo">
                <span className="asterisco">*</span>Tipo de Organização:
              </label>
              <select
                id="tipoOrg"
                name="perfil.organizacao.tipo"
                className="input"
                onChange={(e) =>
                  handleChangeField(ORGANIZACAO.FIELDS.TIPO, e.target.value)
                }
             
                required
              >
                <option value="" >
                  Selecione
                </option>
                <option value="EDITORA">Editora</option>
                <option value="LIVRARIA">Livraria</option>
                <option value="ENSINO">Instituição de Ensino</option>
                <option value="ASSOC_LITERARIA">Associação Literária</option>
                <option value="ORGAO_PUBLICO">Órgão Público</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>
          </>
        )}

        {/* ── E-mail ── */}
        <div>
          <label htmlFor="email">
            <span className="asterisco">*</span>Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={errors["email"] ? "input-error" : "input"}
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.EMAIL, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.EMAIL, e)}
            required
          />
          <ErrorMessages messages={errors["emailMensagem"] as string[]} />
        </div>

        {/* ── Senha ── */}
        <div>
          <label htmlFor="senha">
            <span className="asterisco">*</span>Senha:
          </label>
          <input
            id="senha"
            type="password"
            name="senha"
            className={errors[USUARIO.FIELDS.SENHA] ? "input-error" : "input"}
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.SENHA, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.SENHA, e)}
            required
          />
          <ErrorMessages
            messages={errors[`${USUARIO.FIELDS.SENHA}Mensagem`] as string[]}
          />
        </div>

        {/* ── Confirmar senha ── */}
        <div>
          <label htmlFor="confirmarSenha">
            <span className="asterisco">*</span>Confirmar senha:
          </label>
          <input
            id="confirmarSenha"
            type="password"
            name="confirmarSenha"
            className={
              errors[USUARIO.FIELDS.CONFIRMAR_SENHA] ? "input-error" : "input"
            }
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.CONFIRMAR_SENHA, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.CONFIRMAR_SENHA, e)}
            required
          />
          <ErrorMessages
            messages={
              errors[`${USUARIO.FIELDS.CONFIRMAR_SENHA}Mensagem`] as string[]
            }
          />
        </div>
      </div>

      {/* ── Erro do servidor (ex: email já cadastrado) ── */}
      {serverError && (
        <div className="server-error-box" role="alert">
          {serverError}
        </div>
      )}

      {/* ── Botão de submit ── */}
      <div className="buttons-form next">
        <button
          className="btn-primary"
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Enviando..." : "Confirmar"}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// Tela exibida após cadastro bem-sucedido
// ─────────────────────────────────────────────
function SuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="authContainer success">
      <h2 className="feedback-message">Conta criada com sucesso!</h2>
      <img
        className="icon-success"
        src="/imgs/success-icon.png"
        alt="Ícone de sucesso"
      />
      <p className="success-text">Faça o login com sua conta!</p>
      <button className="ok" onClick={() => navigate("/login")}>
        OK
      </button>
    </div>
  );
}