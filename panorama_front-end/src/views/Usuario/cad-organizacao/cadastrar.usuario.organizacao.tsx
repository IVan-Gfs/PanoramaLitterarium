import "../../../assets/css/usuario/cadastrar.css";  
import "../../../assets/css/usuario/userLayout.css"

import { useState } from "react";

export default function CadastrarUsuarioOrganizacao() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
       

        
        {step === 1 && <UserForm next={next} />}
        {step === 2 && <OrgForm next={next} back={back} />}
        {step === 3 && <SuccessScreen />}
      </div>
    </div>
  );
}

// Step 1 — Dados do Usuário
function UserForm({ next }: { next: () => void }) {
  return (
    <div className="container container-cadastro">
      <h2 className="text-xl font-semibold mb-4">DADOS DO USUÁRIO</h2>

      <div className="form-grid">
        <input className="input" placeholder="Nome de Usuário" />
        <input className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Senha" />
        <input className="input" placeholder="Telefone" />
        <input type="password" className="input col-span-2" placeholder="Confirmar senha" />
      </div>

      {/* Foto de Perfil */}
      <div className="mt-6 grid grid-cols-2 gap-4 items-center">
        <div>
          <label className="font-medium text-sm">Foto de Perfil:</label>
          <div className="w-40 h-40 bg-white border rounded-xl shadow-inner"></div>
        </div>

        <label className="cursor-pointer w-40 h-40 flex flex-col items-center justify-center bg-white border rounded-xl shadow hover:bg-gray-100">
          <span className="font-medium text-sm mb-2">UPLOAD IMAGEM</span>
          <span className="text-3xl">⤴</span>
          <input type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" />
          <p className="text-[10px] mt-1">* png, jpeg ou jpg</p>
        </label>
      </div>

      <div className="buttons-form next">
        <button className="btn-primary" onClick={next}>Avançar</button>
      </div>
    </div>
  );
}

// Step 2 — Dados da Organização
function OrgForm({ next, back }: { next: () => void; back: () => void }) {
  return (
    <div className="container container-cadastro ">
      <h2 className="text-xl font-semibold mb-4">DADOS DA ORGANIZAÇÃO</h2>

      <div className="form-grid">   
        <input className="input" placeholder="Razão Social" />
        <input className="input" placeholder="Nome Fantasia" />
        <input className="input" placeholder="Tipo de Organização" />
        <input className="input" placeholder="CNPJ" />
        <input className="input" placeholder="CEP" />
        <input className="input" placeholder="UF" />
        <input className="input col-span-2" placeholder="Município" />
      </div>

      <div className="buttons-form">
        <button className="btn-secondary" onClick={back}>Voltar</button>
        <button className="btn-primary" onClick={next}>Enviar</button>
      </div>
    </div>
  );
}

// Step 3 — Sucesso
function SuccessScreen() {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold mb-4">Dados enviados com sucesso!</h2>
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white text-4xl">✔</span>
      </div>
      <p className="mt-4 text-gray-700">
        Em breve retornaremos um e-mail de aprovação do seu cadastro.
      </p>
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
