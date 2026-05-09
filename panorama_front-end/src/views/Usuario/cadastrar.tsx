import "../../assets/css/usuario/cadastrar.css";  
import "../../assets/css/usuario/LayoutAuth.css"
import "../../assets/css/usuario/cadastroSuccess.css"
import { useCriar } from "../../services/entities/usuario/hook/useCriar";
import { USUARIO } from "../../services/entities/usuario/constant/usuario.constants";
import { useParams } from "react-router-dom";


export default function CadastrarUsuario() {
const { model, errors, handleChangeField, validateField, onSubmitForm } = useCriar(); 


const { tipoConta } = useParams();

  return (
    <div className="authContainer container-cadastro">
      <h2 className="title">DADOS DO USUÁRIO</h2>

      <div className="form-grid-cadastro-usuario">

        
        <div>
          <label htmlFor="nome"><span className="asterisco">*</span>Seu nome:</label>
          <input 
            type="text" 
            name="nome" 
            className={errors.nome ? "input-error" : "input"} 
            placeholder=""
            onChange={(e) => {handleChangeField(USUARIO.FIELDS.PERFIL.NOME, e.target.value)}}
            onBlur={(e)=> validateField(USUARIO.FIELDS.PERFIL.NOME, e)} 
            required 
          />
          {errors.nome && <span className="input-message-error">{errors.nomeMensagem} </span>} 
        </div>

        <div>
          <label htmlFor="tel"><span className="asterisco">*</span>Telefone:</label>
          <input type="tel" className="input" name="tel" placeholder="" />
        </div>

        {tipoConta === "participante" && (
          <>
            <div>
              <label htmlFor="peseudonimo"><span className="asterisco">*</span>Pseudônimo:</label>
              <input type="text" name="peseudonimo" className="input" placeholder="" required />
            </div>
          </>
        )}
        {tipoConta === "jurado" && (
          <>
            <div>
              <label htmlFor="profissao"><span className="asterisco">*</span>Profissão:</label>
              <input type="text" name="profissao" className="input" placeholder="" required />
            </div>

            <div>
              <label htmlFor="formacao"><span className="asterisco">*</span>Formação:</label>
              <input type="text" name="formacao" className="input" placeholder="" required />
            </div>
          </>
      )}

      {tipoConta === "organizacao" && (
          <>
            <div>
              <label htmlFor="nomeFantasia"><span className="asterisco">*</span>Nome da Organização:</label>
              <input type="text" className="input" name="nomeFantasia" placeholder=""/>
            </div>

            <div>
              <label htmlFor=""><span className="asterisco">*</span>Tipo Organização: </label>
              <select name="tipoOrg" id="tipoOrg" className="input" required>
                <option value="" disabled selected>Selecione</option>
                <option value="editora">Editora</option>
                <option value="assocLiteraria">Livraria</option>
                <option value="ensino">Instituição de Ensino</option>  
                <option value="assocLiteraria">Associação Literária</option>
                <option value="orgaoPublico">Órgão Público</option>
                <option value="outro">Outro</option>
              </select>
           </div>
          </>
      )}

      
        <div>
          <label htmlFor="email"><span className="asterisco">*</span>Email:</label>
          <input 
            type="email" 
            name="email" 
            className={errors.email ? "input-error" : "input"}
            placeholder=""
            onChange={(e) => {handleChangeField(USUARIO.FIELDS.EMAIL, e.target.value)}}
            onBlur={(e)=> validateField(USUARIO.FIELDS.EMAIL, e)} 
            required 
          />
           {errors.email && <span className="input-message-error">{errors.emailMensagem} </span>} 
        </div>
       
        
        <div>
          <label htmlFor="senha"><span className="asterisco">*</span>Senha:</label>
          <input type="email" name="senha" className="input" placeholder="" required />
        </div>

        <div>
          <label htmlFor="confirmarSenha"><span className="asterisco">*</span>Confirmar Senha:</label>
          <input type="email" name="confirmarSenha" className="input" placeholder="" required />
        </div>

      </div>


      <div className="buttons-form next">
        <button className="btn-primary" id="submit" type="submit" onSubmit={onSubmitForm}>Confirmar</button>
      </div>
    </div>
  );
}

// Step 3 — Sucesso
function SuccessScreen() {
  return (
    <div className="authContainer success">
      <h2 className="feedback-message">Dados enviados com sucesso!</h2> 
       <img className="icon-success" src="../../../../public/imgs/success-icon.png" alt="success" />
      <p className="mt-4 text-gray-700">
        Faça o login com sua conta!
      </p>
      <button className="ok">OK</button>
    </div>
  );
}
