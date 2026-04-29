import React, { use, useCallback, useEffect, useState } from "react";
import "../../assets/css/concurso/filtroConcurso.css";
import type { Categoria, CategoriaReponse } from "../../services/entities/categoria/type/Categoria";
import { apiGetCategoria } from "../../services/entities/categoria/api/api.categoria";
import { ROTA } from "../../services/router/url";

interface BotaoProps{
  label: string;
  isAtivo: boolean;
  onClickCategoria: (nome: string) => void
}
export const FiltroConcursos: React.FC<{
  onSearch: (termo: string)=> void, 
  orderByChange: (orderBy: React.ChangeEvent<HTMLSelectElement>) => void,
  filterCategory: (categorias: number[]) => void
}> = ({onSearch, orderByChange, filterCategory}) => {

  const [abrirFiltros, setAbrirFiltros] = useState(false);
  const [abrirFiltrosCategoria, setAbrirFiltrosCategoria] = useState(false)
  const [btnCatAtivos, setBtnCatAtivos] = useState<number[]>([])
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

  const alternarCategoria = (cat: number) =>{ //inclui ou remove o id da categoria ao array de categorias ativas
    if(btnCatAtivos.includes(cat)){
      setBtnCatAtivos(btnCatAtivos.filter(item => item !== cat))
    }else{
      setBtnCatAtivos([...btnCatAtivos, cat])
    }
  }

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
          <label style={{ opacity: 0 }}>Ação</label>
         <button
            className="btn-filtro"
            onClick={() => setAbrirFiltrosCategoria(!abrirFiltrosCategoria)}
          >
            Categoria {btnCatAtivos.length > 0 ? "( "+btnCatAtivos.length+" )" : ''}
         </button>
         {abrirFiltrosCategoria && (
            <div className="filtros-dropdown">
              <h4>Selecione as categorias</h4>

              {categorias.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={()=> alternarCategoria(cat.id)}
                  className={btnCatAtivos.includes(cat.id) ? 'btn-categoria-ativo' : 'btn-categoria'}
                >
                  {cat.nome}
                </button>
              ))}
              <button className="btn-aplicar" onClick={() => filterCategory(btnCatAtivos)}>Aplicar</button>
            </div>
          )}
        </div>


        {/* Ordenação */}
        <div className="filtro-item select">
          <label>Ordenar por</label>
          <select onChange={orderByChange}>
            <option value="">Selecione..</option>
            <option value={["prazoInscricao", "ASC"]}>Prazo mais próximo</option>
            <option value={["prazoInscricao", "DESC"]}>Prazo mais distante</option>
            <option value={["createdAt", "ASC"]}>Mais recentes</option>
            <option value={["createdAt", "DESC"]}>Mais antigos</option>
            <option value={["titulo", "ASC"]}>Título A-Z</option>
            <option value={["titulo", "DESC"]}>Título Z-A</option>
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