import "../../assets/css/usuario/cadastrar.css";
import "../../assets/css/usuario/LayoutAuth.css";
import "../../assets/css/usuario/cadastroSuccess.css";
import { useCriar } from "../../services/entities/usuario/hook/useCriar";
import { USUARIO } from "../../services/entities/usuario/constant/usuario.constants";
import { useParams, useNavigate } from "react-router-dom";
import { ORGANIZACAO } from "../../services/entities/organizacao/constants/org.constants";
import { PARTICIPANTE } from "../../services/entities/participante/constants/participante.constants";
import { JURADO } from "../../services/entities/jurado/constants/jurado.constants";

// ─────────────────────────────────────────────
// Componente auxiliar: exibe lista de mensagens de erro
// Recebe um array de strings e renderiza cada uma em <li>
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

  const { tipoConta } = useParams();

  // Exibe tela de sucesso quando o envio foi bem-sucedido
  if (submitStatus === "success") {
    return <SuccessScreen />;
  }

  const isLoading = submitStatus === "loading";

  return (
    // O onSubmit fica na <form>, não no botão
    <form
      className="authContainer container-cadastro"
      onSubmit={(e) => onSubmitForm(e, tipoConta)}
      noValidate // desativa validação nativa do browser; usamos a nossa
    >
      <h2 className="title">DADOS DO USUÁRIO</h2>

      <div className="form-grid-cadastro-usuario">

        {/* ── Nome ── */}
        <div>
          <label htmlFor="nome">
            <span className="asterisco">*</span>Seu nome:
          </label>
          <input
            id="nome"
            type="text"
            name="nome"
            className={errors[USUARIO.FIELDS.PERFIL.NOME] ? "input-error" : "input"}
            placeholder=""
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.PERFIL.NOME, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.PERFIL.NOME, e)}
            aria-describedby="nome-error"
            required
          />
          <ErrorMessages
            messages={errors[`${USUARIO.FIELDS.PERFIL.NOME}Mensagem`] as string[]}
          />
        </div>

        {/* ── Telefone ── */}
        <div>
          <label htmlFor="tel">
            Telefone:
          </label>
          <input
            id="tel"
            type="tel"
            name="tel"
            className="input"
            placeholder=""
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.PERFIL.TEL, e.target.value)
            }
          />
        </div>

        {/* ── Campos específicos por tipo de conta ── */}

        {tipoConta === "participante" && (
          <div>
            <label htmlFor="peseudonimo">
              <span className="asterisco">*</span>Pseudônimo:
            </label>
            <input
              id="peseudonimo"
              type="text"
              name="peseudonimo"
              className="input"
              placeholder=""
              onChange={(e) =>
                handleChangeField(
                  PARTICIPANTE.FIELDS.PSEUDONIMO,
                  e.target.value
                )
              }
              required
            />
          </div>
        )}

        {tipoConta === "jurado" && (
          <>
            <div>
              <label htmlFor="profissao">
                <span className="asterisco">*</span>Profissão:
              </label>
              <input
                id="profissao"
                type="text"
                name="profissao"
                className="input"
                placeholder=""
                onChange={(e) =>
                  handleChangeField(
                    JURADO.FIELDS.PROFISSAO,
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div>
              <label htmlFor="formacao">
               Formação:
              </label>
              <input
                id="formacao"
                type="text"
                name="formacao"
                className="input"
                placeholder=""
                onChange={(e) =>
                  handleChangeField(
                    JURADO.FIELDS.PROFISSAO,
                    e.target.value
                  )
                }
                required
              />
            </div>
          </>
        )}

        {tipoConta === "organizacao" && (
          <>
            <div>
              <label htmlFor="nomeFantasia">
                <span className="asterisco">*</span>Nome da Organização:
              </label>
              <input
                id="nomeFantasia"
                type="text"
                name="nomeFantasia"
                className="input"
                placeholder=""
                onChange={(e) =>
                  handleChangeField(
                    ORGANIZACAO.FIELDS.NOME_FANTASIA,
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label htmlFor="tipoOrg">
                <span className="asterisco">*</span>Tipo de Organização:
              </label>
              <select
                id="tipoOrg"
                name="tipoOrg"
                className="input"
                onChange={(e) =>
                  handleChangeField(
                    ORGANIZACAO.FIELDS.TIPO,
                    e.target.value
                  )
                }
                required
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="editora">Editora</option>
                <option value="livraria">Livraria</option>
                <option value="ensino">Instituição de Ensino</option>
                <option value="assocLiteraria">Associação Literária</option>
                <option value="orgaoPublico">Órgão Público</option>
                <option value="outro">Outro</option>
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
            className={errors.email ? "input-error" : "input"}
            placeholder=""
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.EMAIL, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.EMAIL, e)}
            aria-describedby="email-error"
            required
          />
          <ErrorMessages messages={errors.emailMensagem as string[]} />
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
            // ← CORRIGIDO: usava errors.email por engano
            className={errors[USUARIO.FIELDS.SENHA] ? "input-error" : "input"}
            placeholder=""
            onChange={(e) =>
              handleChangeField(USUARIO.FIELDS.SENHA, e.target.value)
            }
            onBlur={(e) => validateField(USUARIO.FIELDS.SENHA, e)}
            aria-describedby="senha-error"
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
            // ← CORRIGIDO: campo próprio para confirmarSenha
            className={
              errors[USUARIO.FIELDS.CONFIRMAR_SENHA] ? "input-error" : "input"
            }
            placeholder=""
            onChange={(e) =>
              // ← CORRIGIDO: usava SENHA em vez de CONFIRMAR_SENHA
              handleChangeField(USUARIO.FIELDS.CONFIRMAR_SENHA, e.target.value)
            }
            onBlur={(e) =>
              // ← CORRIGIDO: valida o campo correto
              validateField(USUARIO.FIELDS.CONFIRMAR_SENHA, e)
            }
            aria-describedby="confirmarSenha-error"
            required
          />
          <ErrorMessages
            messages={
              errors[`${USUARIO.FIELDS.CONFIRMAR_SENHA}Mensagem`] as string[]
            }
          />
        </div>
      </div>

      {/* ── Erro vindo do servidor (ex: email já cadastrado) ── */}
      {serverError && (
        <div className="server-error-box" role="alert">
          {serverError}
        </div>
      )}

      {/* ── Botões ── */}
      <div className="buttons-form next">
        <button
          className="btn-primary"
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {/* Mostra feedback visual durante o envio */}
          {isLoading ? "Enviando..." : "Confirmar"}
        </button>
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// Tela de sucesso exibida após cadastro concluído
// ─────────────────────────────────────────────
function SuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="authContainer success">
      <h2 className="feedback-message">Dados enviados com sucesso!</h2>
      <img
        className="icon-success"
        src="/imgs/success-icon.png"
        alt="Ícone de sucesso"
      />
      <p className="success-text">Faça o login com sua conta!</p>
      {/* Redireciona para a página de login */}
      <button className="ok" onClick={() => navigate("/login")}>
        OK
      </button>
    </div>
  );
}
