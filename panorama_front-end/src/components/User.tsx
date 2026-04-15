import { Link, Outlet, useNavigate } from "react-router-dom";
import '../assets/css/usuario/userLayout.css'



export default function User(){

    const navigate = useNavigate();
    return (
        <div id="LayoutLogin">
            <header id="headerLogin">
               
                <img className="goBack" src="/imgs/arrow-back.png" alt="Voltar" onClick={() => navigate(-1)} />
                <Link to="/">
                    <img src="/logo.svg" alt="logo" className="logo" />
                </Link>
                
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}