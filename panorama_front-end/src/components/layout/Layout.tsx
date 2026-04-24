import '../../assets/css/main.css';
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div id="defaultLayout">

      <header id="HeaderHome">

        {/* LADO ESQUERDO */}
        <div className="leftHeader">

          <NavLink to="/" className="logoLink">
            <img src="/logo.svg" alt="logo" className="Logo" />
          </NavLink>

          <nav id="navbar">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "itemMenu active" : "itemMenu"
              }
            >
              <img src="/imgs/inicio.png" alt="inicio" />
              Inicio
            </NavLink>

            <NavLink
              to="/concursos"
              className={({ isActive }) =>
                isActive ? "itemMenu active" : "itemMenu"
              }
            >
              <img src="/imgs/concurso.png" alt="concursos" />
              Concursos
            </NavLink>

          </nav>
        </div>

        {/* LADO DIREITO */}

        <div className='rightHeader'>
            <NavLink
            to="/user/login"
            className={({ isActive }) =>
                isActive ? "itemMenu login active" : "itemMenu login"
            }
            >
            Entrar
            </NavLink>

            <NavLink
            to="/user/cadastrar"
            className={({ isActive }) =>
                isActive ? "itemMenu cadastrar active" : "itemMenu cadastrar"
            }
            >
            Cadastrar
            </NavLink>
        </div>

      </header>

      <main>
        <Outlet />
      </main>

    </div>
  );
}