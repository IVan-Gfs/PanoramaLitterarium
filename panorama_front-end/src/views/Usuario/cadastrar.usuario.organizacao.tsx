import "../../assets/css/usuario/cadastrar.css";  
import "../../assets/css/usuario/LayoutAuth.css"
import "../../assets/css/usuario/cadastroSuccess.css"
import { useState } from "react";
import { estados } from "../../utils/estados";
import { useCriar } from "../../services/entities/usuario/hook/useCriar";
import { USUARIO } from "../../services/entities/usuario/constant/usuario.constants";


export default function CadastrarUsuarioOrganizacao() {

  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div className="">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
        {step === 1 && <OrgForm next={next} back={back} />}
        {step === 2 && <UserForm next={next}/>}
        {step === 3 && <SuccessScreen />}
      </div>
    </div>
  );
}

// Step 1 — Dados do Usuário
function UserForm({ next }: { next: () => void }) {
  const { model, errors, handleChangeField, validateField, onSubmitForm } =
    useCriar(); 
  return (
    <div className="authContainer container-cadastro">
      <h2 className="title">DADOS DO USUÁRIO</h2>

      <div className="form-grid-cadastro-usuario">
        <div>
          <label htmlFor="email"><span className="asterisco">*</span>Email:</label>
          <input 
            type="email" 
            name="email" 
            className="input" 
            placeholder=""
            onChange={(e) => {handleChangeField(USUARIO.FIELDS.EMAIL, e.target.value)}}
            onBlur={(e)=> validateField(USUARIO.FIELDS.EMAIL, e)} 
            required 
          />
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
        <button className="btn-primary" onClick={next}>AVANÇAR</button>
      </div>
    </div>
  );
}

// Step 2 — Dados da Organização
function OrgForm({ next, back }: { next: () => void; back: () => void }) {
  return (
    <div className="authContainer container-cadastro ">
      <h2 className="title">DADOS DA ORGANIZAÇÃO</h2>

      <div className="form-grid-cadastro-usuario">
        <div>
          <label htmlFor="razaoSocial"><span className="asterisco">*</span>Razão Social:</label>
          <input type="text" name="razaoSocial" className="input" placeholder="" />
        </div>   
        
        <div>
          <label htmlFor="nomeFantasia"><span className="asterisco">*</span>Nome Fantasia:</label>
          <input type="text" className="input" name="nomeFantasia" placeholder=""/>
        </div>

        <div>
          <label htmlFor="cnpj"><span className="asterisco">*</span>CNPJ:</label>
          <input type="text" className="input" name="cnpj" placeholder="" />
        </div>

        <div>
          <label htmlFor="tel"><span className="asterisco">*</span>Telefone:</label>
          <input type="tel" className="input" name="tel" placeholder="" />
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
      

        <div className="cep-uf-inline">
          <div>
            <label htmlFor="cep"><span className="asterisco">*</span>CEP:</label>
            <input type="text" className="input" name="cep" placeholder="" />
          </div>

          <div>
            <label htmlFor="uf"><span className="asterisco">*</span>Unidade Federal:</label>
            <select name="uf" id="uf" className="input" required>
              <option value="" disabled selected>Selecione</option>
              {
                estados.map((e) => (
                  <option key={e.uf} value={e.uf}>
                    {e.nome}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
       

        
        
        <div>
          <label htmlFor="municipio"><span className="asterisco">*</span>Município:</label>
          <input type="text" className="input" name="municipio" placeholder="" />
        </div>

        <div>
          <label htmlFor="endereco"><span className="asterisco">*</span>Endereço:</label>
          <input type="text" className="input" name="endereco" placeholder="" />
        </div>
        
        
      </div>

      <div className="buttons-form">
        <button className="btn-secondary" onClick={back}>VOLTAR</button>
        <button className="btn-primary" onClick={next}>ENVIAR</button>
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

// Tailwind utility classes (optional suggestion for your project)
/*
.input {
  @apply border rounded-lg p-2 shadow-sm w-full;
}
.btn-primary {
  @apply bg-green-300 hover:bg-green-400 px-4 py-2 rounded-lg shadow;
}
.btn-secondary {
  @apply bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg shadow;
}
*/
