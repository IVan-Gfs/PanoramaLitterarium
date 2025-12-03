//import type { ReactNode } from "react";
import '../assets/css/index.css';
import '../assets/css/main.css';    
import { Link, Outlet } from "react-router-dom";


export default function Layout(){
    return (
        <div id="defaultLayout">
            
            <header id='HeaderHome'>
                <Link to="/">
                    <img src="../../public/logo.svg " alt="logo.svg" className='Logo' />
                </Link>
                
                <ul id='navbar'>
                    <li>
                    
                        
                        <Link to="/"><img src="../../public/imgs/inicio.png" alt="inicio" /></Link>
                        <Link to="/" className='itemMenu'>Inicio</Link>
                        
                    </li>
                    <li >
                        
                        <Link to="/concursos"><img src="../../public/imgs/concurso.png" alt="concursos"/></Link>
                        <Link to="/concursos" className='itemMenu'>Concursos</Link>
                        
                    </li>
                    <li id='item-login'>   
                        
                        <Link to="/user/login" className='itemMenu' >Login</Link>
                        <Link to="/user/login"><img src="../../public/imgs/login.png" alt="logar" /></Link>
                        
                    </li>
                    
                </ul>
                
            </header>

            <main>
                <Outlet/>
            </main>
            
        </div>
    )
}