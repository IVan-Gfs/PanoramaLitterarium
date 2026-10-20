import { Link } from "react-router-dom";

import '../assets/css/home.css';

// Ajuste as rotas conforme o seu router (services/router/url ou App.tsx)
const ROTA_PARTICIPANTE = "/concursos";
const ROTA_ORGANIZADOR = "/para-organizadores";
const ROTA_CATEGORIAS = "/categorias";

const PASSOS = [
  {
    titulo: "Encontre um concurso",
    texto: "Filtre por categoria, prazo de inscrição e localidade até achar o que combina com o seu texto.",
  },
  {
    titulo: "Leia o edital",
    texto: "Regras, premiação e critérios de avaliação ficam reunidos na página de cada concurso.",
  },
  {
    titulo: "Inscreva sua obra",
    texto: "Envie o texto pelo próprio sistema e acompanhe o andamento até o resultado.",
  },
];

export default function HomePage() {
  return (
    <main className="ini-main">

      <section className="ini-hero">
        <div className="ini-hero-inner">
          <h1 className="ini-hero-titulo">Concursos literários, reunidos num só lugar</h1>
          <p className="ini-hero-texto">
            O Panorama Litterarium conecta quem escreve a quem organiza. Encontre editais de poesia,
            conto, crônica e outras categorias, ou publique o seu concurso e receba as inscrições
            direto pelo sistema.
          </p>
        </div>
      </section>

      <section className="ini-caminhos" aria-label="Escolha como quer usar o Panorama">
        <div className="ini-caminho">
          <h2 className="ini-caminho-titulo">Quero participar</h2>
          <p className="ini-caminho-texto">
            Veja os concursos com inscrições abertas, leia os editais e inscreva a sua obra.
          </p>
          <Link to={ROTA_PARTICIPANTE} className="ini-btn ini-btn-cheio">
            Ver concursos
          </Link>
        </div>

        <div className="ini-caminho">
          <h2 className="ini-caminho-titulo">Quero organizar</h2>
          <p className="ini-caminho-texto">
            Cadastre sua organização, publique concursos, receba as inscrições e avalie com o seu júri.
          </p>
          <Link to={ROTA_ORGANIZADOR} className="ini-btn ini-btn-contorno">
            Conhecer a área para organizadores
          </Link>
        </div>
      </section>

      <section className="ini-secao">
        <div className="ini-secao-inner">
          <h2 className="ini-secao-titulo">Como funciona para quem participa</h2>
          <ol className="ini-passos">
            {PASSOS.map((passo, index) => (
              <li key={passo.titulo} className="ini-passo">
                <span className="ini-passo-numero">{index + 1}</span>
                <h3 className="ini-passo-titulo">{passo.titulo}</h3>
                <p className="ini-passo-texto">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ini-categorias">
        <div className="ini-categorias-inner">
          <div>
            <h2 className="ini-categorias-titulo">Ainda não sabe em qual categoria se encaixa?</h2>
            <p className="ini-categorias-texto">
              Conheça as categorias textuais aceitas nos concursos e o que caracteriza cada uma.
            </p>
          </div>
          <Link to={ROTA_CATEGORIAS} className="ini-btn ini-btn-contorno">
            Ver categorias
          </Link>
        </div>
      </section>

    </main>
  );
}
