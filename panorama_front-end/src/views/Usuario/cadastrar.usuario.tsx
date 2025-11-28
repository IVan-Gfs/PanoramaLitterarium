import { Link } from "react-router-dom";
import "../../assets/css/usuario/tipoUsuario.css";    

export default function CriarConta ( ){
    return (
    <div className="container">
        <h2>Selecione o tipo de conta: </h2>

        <Link to="" className="card-user">
            
                <p>PARTICIPANTE</p>
                <img src="../../public/imgs/arrow_enter.png" alt="" />
            
        </Link>

        <Link to="/user/cadastrar/organização" className="card-user">          
                <p>ORGANIZAÇÃO</p>
                <img src="../../public/imgs/arrow_enter.png" alt="" />
        </Link>

        <Link to="" className="card-user">
                <p>JURADO</p>
                <img src="../../public/imgs/arrow_enter.png" alt="" />
        </Link>
        
    </div> 

     
    )


}