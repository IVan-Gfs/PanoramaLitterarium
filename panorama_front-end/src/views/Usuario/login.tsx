import { Link } from "react-router-dom";
import "../../assets/css/usuario/login.css";    

export default function Login ( ){
    return (
    <div className="container">
        <form className="">
            <div>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" />
            </div>
            
            <div>
                <label htmlFor="email">Senha: </label>
                <input type="password" name="email" />
            </div>
        
            <input type="submit" value="ENTRAR" id="submit"/>
        </form>

        <p id="p-registrar">Não possui conta? Registre-se clicando <Link to="/user/cadastrar" id="cadastrar"><span>AQUI</span></Link></p>
    </div> 

     
    )


}