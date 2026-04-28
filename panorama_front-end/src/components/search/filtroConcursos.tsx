import React, { useCallback, useEffect, useState } from "react";
import "../../assets/css/concurso/filtroConcurso.css";
import type { Categoria, CategoriaReponse } from "../../services/entities/categoria/type/Categoria";
import { apiGetCategoria } from "../../services/entities/categoria/api/api.categoria";
import { ROTA } from "../../services/router/url";

export const FiltroConcursos: React.FC<{onSearch: (termo: string)=> void}> = ({onSearch}) => {

  const [abrirFiltros, setAbrirFiltros] = useState(false);
  const [busca, setBusca] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const buscarTodasCategorias = useCallback(
    async (): Promise<CategoriaReponse| null> =>{
      try{
        const response = await apiGetCategoria(ROTA.CATEGORIA.LISTAR)
        return response.data
      }catch(error: any){
        console.log("Erro ao buscar concursos:", error);
      }
      return null
    }, []
  )

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      onSearch(busca)
    }, 500)

    return () => clearTimeout(timeout)
  },[busca, onSearch])

  useEffect(()=>{
    async function fetchCategoria(){
      const data = await buscarTodasCategorias()
      if(data){
        setCategorias(data.dados)
   
        
      }
    }
    fetchCategoria()
  },[])
  return (
    <div className="filtro-container">
      <div className="filtro-linha">
        
        {/* Busca */}
        <div className="filtro-item grow">
          <label>Buscar por título</label>
          <input
            type="text"
            value={busca}
            onChange={ e => setBusca(e.target.value)}
            placeholder="Digite o título do concurso..."
          />
        </div>

        {/* Categoria */}
        <div className="filtro-item select">
          <label>Categoria</label>
          <select>
            <option value="">TODAS</option>
            {categorias.map((cat) => (<option key={cat.id}>{cat.nome}</option>))}
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