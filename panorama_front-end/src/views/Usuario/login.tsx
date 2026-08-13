import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../assets/css/usuario/login.css";    
import { useState } from "react";
import { loginUsuario } from "../../services/entities/usuario/api/usuario.api";
import { useAuth } from "../../contexts/AuthContext";


export default function Login ( ){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const [errorEmail, setErrorEmail] = useState(false);
    const [msgErrorEmail, setMsgErrorEmail] = useState("");
    const [msgErrorSenha, setMsgErrorSenha] = useState("");
    const [errorSenha, setErrorSenha] = useState(false);

    const [serverError, setServerError] = useState<string | null>(null);

    const navigate = useNavigate();
    const {login} = useAuth();

    function validatedForm() {
        if(email.trim() === "" || senha.trim() === "") {
            setErrorEmail(email.trim() === "");
            setMsgErrorEmail(email.trim() === "" ? "O email é obrigatório." : "");
            setErrorSenha(senha.trim() === "");
            setMsgErrorSenha(senha.trim() === "" ? "A senha é obrigatória." : "");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setErrorEmail(true);
            setMsgErrorEmail("O email informado não é válido.");
            return false;
        }
        setErrorEmail(false);
        setMsgErrorEmail("");
        setErrorSenha(false);
        setMsgErrorSenha("");
        return true;
    }
    async function handleLogin() {
        if(!validatedForm()) {
            return;
        }

        try {
            const response = await loginUsuario({ email, senha });
            console.log("Login bem-sucedido:", response.data);
            localStorage.setItem("token", response.data.token);
            
            login(response.data);
            navigate("/portal/visao-geral");
        } catch (error: any) {
            console.error("Erro ao fazer login:", error);
            const msg =
            error?.response?.data?.message ||
            error?.message ||
            "Erro ao fazer login. Tente novamente.";
            setServerError(msg);
        }
    }
    return (
    <div className="authContainer">
        <h2>Bem-vindo(a)! Acesse sua conta.</h2>
        <form className="">
            <div>
                <input 
                    type="text" 
                    name="email" 
                    className="input login-input" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
            </div>
            <legend className="input-message-error">{errorEmail && msgErrorEmail}</legend>
            
            <div>
                
                <input 
                    type="password" 
                    name="senha" 
                    className="input"
                    placeholder="Senha" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                />
            </div>
            <legend className="input-message-error">{errorSenha && msgErrorSenha}</legend>

            {serverError && (
                <div className="server-error-box" role="alert">
                {serverError}
                </div>
            )}
            <input type="submit" value="ENTRAR" id="submit" onClick={(e) => {
                e.preventDefault();
                handleLogin();
            
            }}/>
        </form>


        <p id="p-registrar">Não possui conta? <Link to="/user/cadastrar" id="cadastrar"><span>Cadastre-se</span></Link></p>
    </div> 

     
    )


}