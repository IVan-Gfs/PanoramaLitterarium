import { BookMarked, Building, GraduationCap, NotebookPen, XCircle } from "lucide-react";
import "../../assets/css/concurso/para-organizadores.css";

export default function Organizadores() {
  return (
    <main className="organizadores">

      {/* =====================================================
          1. HERO / PROPOSTA DE VALOR
      ====================================================== */}
      <section className="organizadores__hero">
        {/* <span className="section-label">PARA ORGANIZADORES</span> */}

        <h1>
          Organize e promova seleções literárias de forma simples e ágil.
        </h1>

        <img src="/banner-estante.png" alt=""  className="banner-estante"/>

        <p>
          O <strong>Panorama Litterarium</strong> conecta organizadores, escritores e jurados
          em uma plataforma única! <strong>Faça a gestão completa das suas seleções lietarárias:</strong> publique, receba as inscrições, faça a triagem, avaliação e divulgue os resultados.
        </p>

        <div className="section-actions">
          <a href="#contato" className="button button--primary">
            Quero organizar um concurso
          </a>

          <a href="#como-funciona" className="button button--secondary">
            Conhecer a plataforma
          </a>
        </div>
      </section>


      {/* =====================================================
          2. PROBLEMA
      ====================================================== */}
      <section className="organizadores__section organizadores__problem">
        <span className="section-label">O PROBLEMA</span>

        <h2>
          Organizar uma seleção literária não deveria exigir tantos processos
          manuais.
        </h2>

        <p>
          Muitas organizações ainda precisam utilizar diferentes ferramentas
          para controlar inscrições, obras, avaliações e resultados.
        </p>

        <ul className="simple-list">
          <li>Inscrições espalhadas por diferentes canais <XCircle/></li>
          <li>Conferência manual das obras <XCircle/></li>
          <li>Planilhas para organização das avaliações <XCircle/></li>
          <li>Controle manual de critérios e notas <XCircle/></li>
          <li>Comunicação individual com participantes <XCircle/></li>
          <li>Dificuldade para acompanhar as etapas da seleção <XCircle/></li>
        </ul>
      </section>


      {/* =====================================================
          3. SOLUÇÃO / PROPOSTA DE VALOR
      ====================================================== */}
      <section className="organizadores__section">
        <span className="section-label">A SOLUÇÃO</span>

        <h2>
          Uma plataforma para centralizar sua seleção literária.
        </h2>

        <p>
          O Panorama Litterarium reúne em um único ambiente as principais
          etapas necessárias para organizar uma seleção.
        </p>

        <div className="workflow">
          <div className="workflow__item">
            <strong>#01</strong>
            <h3>Publicação</h3>
            <p>
              Apresente o concurso, regulamento, categorias e prazos.
            </p>
          </div>

          <div className="workflow__item">
            <strong>#02</strong>
            <h3>Recebimento</h3>
            <p>
              Centralize inscrições e submissões das obras.
            </p>
          </div>

          <div className="workflow__item">
            <strong>#03</strong>
            <h3>Triagem</h3>
            <p>
              Organize a primeira etapa de seleção.
            </p>
          </div>

          <div className="workflow__item">
            <strong>#04</strong>
            <h3>Avaliação</h3>
            <p>
              Utilize critérios e avaliações estruturadas.
            </p>
          </div>

          <div className="workflow__item">
            <strong>#05</strong>
            <h3>Divulgação</h3>
            <p>
              Centralize resultados e comunicações.
            </p>
          </div>
        </div>
      </section>


      {/* =====================================================
          4. BENEFÍCIOS
      ====================================================== */}
      <section className="organizadores__section organizadores__benefits">
        <span className="section-label">BENEFÍCIOS</span>

        <h2>
          Mais organização para quem promove literatura.
        </h2>

        <div className="benefits">
          <article className="benefit">
            <div className="benefit__icon">01</div>

            <h3>Menos trabalho operacional</h3>

            <p>
              Reduza tarefas repetitivas e concentre as informações da
              seleção em um único lugar.
            </p>
          </article>

          <article className="benefit">
            <div className="benefit__icon">02</div>

            <h3>Avaliações centralizadas</h3>

            <p>
              Critérios, notas, justificativas e jurados ficam organizados
              dentro da plataforma.
            </p>
          </article>

          <article className="benefit">
            <div className="benefit__icon">03</div>

            <h3>Processos por etapas</h3>

            <p>
              Estruture triagem, classificação e etapas finais de acordo
              com sua seleção.
            </p>
          </article>

          <article className="benefit">
            <div className="benefit__icon">04</div>

            <h3>Mais transparência</h3>

            <p>
              Apresente informações, etapas e resultados de maneira mais
              clara aos participantes.
            </p>
          </article>
        </div>
      </section>


      {/* =====================================================
          5. DEMONSTRAÇÃO DO PRODUTO
      ====================================================== */}
      <section
        id="como-funciona"
        className="organizadores__section"
      >
        <span className="section-label">COMO FUNCIONA</span>

        <h2>
          Do edital ao resultado.
        </h2>

        <p>
          Conheça algumas das etapas que podem ser realizadas dentro do
          Panorama Litterarium.
        </p>

        <div className="product-demo">

          <article className="product-demo__item">
            <div className="product-demo__image">
              <img src="/step1-landing-page.png" alt="" className="product-demo-img"/>
             
            </div>

            <div className="product-demo__content">
              <span>01</span>

              <h3>Publique sua seleção</h3>

              <p>
                Cadastre as informações do concurso, regulamento, categorias, critérios avaliativos,
                premiação e prazo de inscrição.
              </p>
            </div>
          </article>


          <article className="product-demo__item">
            <div className="product-demo__image">
              <img src="/step2-landing-page.png" alt="" className="product-demo-img"/>
             
            </div>

            <div className="product-demo__content">
              <span>02</span>

              <h3>Receba as obras</h3>

              <p>
                Centralize as inscrições e submissões realizadas pelos
                participantes.
              </p>
            </div>
          </article>


          <article className="product-demo__item">
            <div className="product-demo__image">
              <img src="/step3-landing-page.png" alt="" className="product-demo-img"/>
              
            </div>

            <div className="product-demo__content">
              <span>03</span>

              <h3>Triagem e avaliação</h3>

              <p>
                Realize a triagem das obras segundo o regulamento, avalie conforme critérios personalizados
              </p>
            </div>
          </article>


          <article className="product-demo__item">
            <div className="product-demo__image">
              <img src="/step4-landing-page.png" alt="" className="product-demo-img"/>
            </div>

            <div className="product-demo__content">
              <span>04</span>

              <h3>Divulgue os resultados</h3>

              <p>
                Centralize a classificação e a comunicação com os
                participantes.
              </p>
            </div>
          </article>

        </div>
      </section>


      {/* =====================================================
          6. PARA QUEM É
      ====================================================== */}
      <section className="organizadores__section">
        <span className="section-label">PARA QUEM É</span>

       
        <h2>
          Feito para quem movimenta a literatura.
        </h2>


        <div className="audience">

          <article className="audience__item">
            <div className="audience-icon-container">
              <NotebookPen  className="audience-icon"/>
            </div>
            <h3>Editoras</h3>
            <p>
              Organize concursos, chamadas literárias e processos de seleção
              de obras.
            </p>
          </article>

          <article className="audience__item">
            <div className="audience-icon-container">
              <GraduationCap  className="audience-icon"/>
            </div>
            <h3>Instituições de ensino</h3>
            <p>
              Promova concursos e atividades literárias para estudantes e
              comunidades acadêmicas.
            </p>
          </article>

          <article className="audience__item">
            <div className="audience-icon-container">
              <Building  className="audience-icon"/>
            </div>
            <h3>Órgãos públicos</h3>
            <p>
              Estruture editais e seleções culturais com maior organização.
            </p>
          </article>

          <article className="audience__item">
            <div className="audience-icon-container">
              <BookMarked  className="audience-icon"/>
            </div>
            
            <h3>Projetos literários</h3>
            <p>
              Crie seleções e antologias sem precisar desenvolver uma
              infraestrutura própria.
            </p>
          </article>

        </div>
      </section>


      {/* =====================================================
          7. DEPOIMENTOS
      ====================================================== */}
      <section className="organizadores__section organizadores__testimonials">
        <span className="section-label">DEPOIMENTOS</span>

        <h2>
          O que dizem sobre nós.
        </h2>

        <div className="testimonials">

          <article className="testimonial">
            <p>
              “Viabilizou completamente a organização do concurso! Automatizou a triagem de centenas de obras e padronizou a submissão dos textos. Com o Panorama Litterarium, nós passamos a poder promover muito mais seleções ao ano!”
            </p>

            <span>
              — Typus Editora
            </span>
          </article>

          <article className="testimonial">
            <p>
              “Facilitou muito o processo do concurso! Com a atribuição organizada e justa de notas em critérios avaliativos personalizados e avaliação da banca completamente anônima.”
            </p>

            <span className="testimonial-name">
              — IFSP (Instituto Federal de Educação, Ciência e Tecnologia de São Paulo )
            </span>
          </article>

        </div>
      </section>


      {/* =====================================================
          8. FAQ
      ====================================================== */}
      <section className="organizadores__section">
        <span className="section-label">PERGUNTAS FREQUENTES</span>

        <h2>
          Tire suas dúvidas.
        </h2>

        <div className="faq">

          <details>
            <summary>
              O Panorama é apenas para concursos de poesia?
            </summary>

            <p>
              Não. A plataforma começa com foco em literatura e pode atender
              diferentes gêneros e formatos de seleção.
            </p>
          </details>

          <details>
            <summary>
              Quem pode organizar uma seleção?
            </summary>

            <p>
              Editoras, instituições de ensino, órgãos públicos, coletivos
              e outros projetos literários.
            </p>
          </details>

          <details>
            <summary>
              Posso utilizar diferentes categorias?
            </summary>

            <p>
              Sim. Uma seleção pode trabalhar com diferentes categorias e
              gêneros literários.
            </p>
          </details>

          <details>
            <summary>
              É possível utilizar jurados diferentes em cada etapa?
            </summary>

            <p>
              A estrutura da plataforma permite organizar bancas e etapas
              de avaliação.
            </p>
          </details>

          <details>
            <summary>
              Preciso desenvolver meu próprio sistema?
            </summary>

            <p>
              Não. O Panorama foi pensado para oferecer a infraestrutura
              necessária para organizar a seleção.
            </p>
          </details>

        </div>
      </section>


      {/* =====================================================
          9. CTA
      ====================================================== */}
      <section className="organizadores__cta">
        <span className="section-label">
          VAMOS COMEÇAR?
        </span>

        <h2>
          Sua próxima seleção pode começar aqui.
        </h2>

        <p>
          Centralize inscrições, avaliações e resultados em uma plataforma
          pensada para o universo literário.
        </p>

        <a href="#contato" className="button button--primary">
          Quero organizar uma seleção
        </a>
        <div id="logo-panorama">
            <img src="/logo.svg" alt="" />
        </div>
         

      </section>


      {/* =====================================================
          10. FORMULÁRIO
      ====================================================== */}
      <section
        id="contato"
        className="organizadores__section organizadores__contact"
      >
        <span className="section-label">ENTRE EM CONTATO</span>

        <h2>
          Quer utilizar o Panorama?
        </h2>

        <p>
          Conte um pouco sobre sua organização e sobre a seleção que pretende
          realizar.
        </p>

        <form className="contact-form">

          <div className="form-group">
            <label htmlFor="nome">
              Nome
            </label>

            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
            />
          </div>


          <div className="form-group">
            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
            />
          </div>


          <div className="form-group">
            <label htmlFor="organizacao">
              Organização
            </label>

            <input
              id="organizacao"
              type="text"
              placeholder="Nome da organização"
            />
          </div>


          <div className="form-group">
            <label htmlFor="tipo">
              Tipo de organização
            </label>

            <select id="tipo">
              <option value="">
                Selecione
              </option>

              <option value="editora">
                Editora
              </option>

              <option value="ensino">
                Instituição de ensino
              </option>

              <option value="publico">
                Órgão público
              </option>

              <option value="projeto">
                Projeto literário
              </option>

              <option value="outro">
                Outro
              </option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="mensagem">
              Conte sobre sua seleção
            </label>

            <textarea
              id="mensagem"
              rows={5}
              placeholder="Descreva brevemente o que você pretende realizar..."
            />
          </div>


          <button
            type="submit"
            className="button button--primary"
          >
            Quero conhecer o Panorama
          </button>

        </form>
      </section>

    </main>
  );
}