import { Link, Outlet } from "react-router-dom";
import '../assets/css/usuario/userLayout.css'

export default function User(){

    return (
        <div id="LayoutLogin">
            <header id="headerLogin">
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