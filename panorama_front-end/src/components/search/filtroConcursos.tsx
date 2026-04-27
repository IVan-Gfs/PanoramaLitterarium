import React, { useState } from "react";
import "../../assets/css/concurso/filtroConcurso.css";

export const FiltroConcursos: React.FC = () => {

  const [abrirFiltros, setAbrirFiltros] = useState(false);
  return (
    <div className="filtro-container">
      <div className="filtro-linha">
        
        {/* Busca */}
        <div className="filtro-item grow">
          <label>Buscar por título</label>
          <input
            type="text"
            placeholder="Digite o título do concurso..."
          />
        </div>

        {/* Categoria */}
        <div className="filtro-item select">
          <label>Categoria</label>
          <select>
            <option>TODAS</option>
            <option>CONTOS</option>
            <option>CORDEL</option>
            <option>CRÔNICAS</option>
            <option>ENSAIOS</option>
            <option>POEMAS</option>
            <option>HAICAIS</option>
            <option>POESIAS</option>
            <option>MICROCONTOS</option>
             <option>SONETOS</option>
            <option>TEATROS</option>
            
          </select>
        </div>

        {/* Ordenação */}
        <div className="filtro-item select">
          <label>Ordenar por</label>
          <select>
            <option>Prazo mais próximo</option>
            <option>Prazo mais distante</option>
            <option>Mais recentes</option>
          </select>
        </div>

        {/* Botão filtros */}
        <div className="filtro-item select">
          <label style={{ opacity: 0 }}>Ação</label>
         <button
            className="btn-filtro"
            onClick={() => setAbrirFiltros(!abrirFiltros)}
          >
            Mais filtros
         </button>
         {abrirFiltros && (
            <div className="filtros-dropdown">
              <h4>Filtros avançados</h4>

              <label>
                <input type="checkbox" />
                Gratuito
              </label>

              <label>
                <input type="checkbox" />
                Pago
              </label>

              <label>
                <input type="checkbox" />
                Com prêmio em dinheiro
              </label>

              <button className="btn-aplicar">Aplicar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};