import { Link, Outlet, useNavigate } from "react-router-dom";
import '../assets/css/usuario/userLayout.css'



export default function User(){

    const navigate = useNavigate();
    return (
        <div id="LayoutLogin">
            <header id="headerLogin">
               
                <img className="goBack" src="../../public/imgs/arrow-back.png" alt="Voltar" onClick={() => navigate(-1)} />
                <Link to="/inicio">
                    <img src="../../public/logo.svg" alt="logo" className="logo" />
                </Link>
                
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}