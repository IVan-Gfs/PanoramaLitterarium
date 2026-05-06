import { Link } from "react-router-dom";
import "../../assets/css/usuario/tipoUsuario.css";    

export default function SelecionarConta ( ){
    return (
    <div className="authContainer">
        <h2>Selecione o tipo de conta: </h2>

        <Link to="/user/cadastrar/participante" className="card-user">

                <div className="card-user-flex"> 
                        <p>PARTICIPANTE</p>
                        <img src="../../public/imgs/arrow_enter.png" alt="" />
                </div>
                <legend>Participe de seleções literárias</legend>
        </Link>
        
        <Link to="/user/cadastrar/organizacao" className="card-user">
                
                <div className="card-user-flex"> 
                        <p>ORGANIZAÇÃO</p>
                        <img src="../../public/imgs/arrow_enter.png" alt="" />
                </div>
                <legend>Publique seleções literárias</legend>
        </Link>
        

        <Link to="/user/cadastrar/jurado" className="card-user">
                <div className="card-user-flex"> 
                        <p>JURADO</p>
                        <img src="../../public/imgs/arrow_enter.png" alt="" />
                </div>
                <legend>Seja avaliador em seleções literárias</legend>    
        </Link>
        
    </div> 

     
    )


}