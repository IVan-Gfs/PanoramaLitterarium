//import type { ReactNode } from "react";
import '../assets/css/index.css';
import '../assets/css/main.css';



import { Link, Outlet } from "react-router-dom";


export default function Layout(){
    return (
        <div id="defaultLayout">
            
            <header>
                <img src="../../public/logo.svg " alt="logo.svg" className='Logo' />
                <ul id='navbar'>
                    <li>
                    
                        <Link to="#" className='itemMenu'>Inicio</Link>
                        <img src="../../public/imgs/inicio.png" alt="inicio" />
                    </li>
                    <li >
                        <Link to="#" className='itemMenu'>Concursos</Link>
                        <img src="../../public/imgs/concurso.png" alt="concursos" />
                    </li>
                    <li>   
                       
                        <img src="../../public/imgs/login.png" alt="logar" />
                        <Link to="/panorama/cadastrar" className='itemMenu' >Login</Link>
                    </li>
                    
                </ul>
                
            </header>

            <main>
                <Outlet/>
            </main>
            
        </div>
    )
}