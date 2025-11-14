//import type { ReactNode } from "react";
import '../assets/css/index.css';
import '../assets/css/main.css';
import { Link, /*Outlet*/ } from "react-router-dom";


export default function Layout(){
    return (
        <div id="defaultLayout">
            <header>
                <h1> Panorama Litterarium</h1>
                <ul>
                    <li>
                        <Link to="/panorama/cadastrar" >Criar Conta</Link>
                    </li>
                </ul>
                
            </header>
        </div>
    )
}