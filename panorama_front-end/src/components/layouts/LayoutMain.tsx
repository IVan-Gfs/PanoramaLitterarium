import '../../assets/css/main.css';
import '../../assets/css/footer.css'
import { NavLink, Outlet } from "react-router-dom";

export default function LayoutMain() {
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

      <footer className="footer">
        <div className="footer-container">

          {/* Sobre */}
          <div className="footer-section">
            <h3>Panorama Litrerarium</h3>
            <p>
              Explorando o universo da literatura, conectando leitores, autores e instituições literárias.
            </p>
          </div>

          {/* Links */}
          <div className="footer-section">
            <h4>Links rápidos</h4>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#">Concursos</a></li>
              <li><a href="#">Organizadores</a></li>
              <li><a href="#">Categorias</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="footer-section">
            <h4>Suporte</h4>
            <ul>
              <li><a href="#">Central de ajuda</a></li>
              <li><a href="#">Termos de uso</a></li>
              <li><a href="#">Privacidade</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4>Newsletter</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Seu e-mail" />
              <button type="submit">Inscrever</button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Panorama Litrerarium. Todos os direitos reservados.</p>
        </div>
    </footer>
    </div>
  );
}