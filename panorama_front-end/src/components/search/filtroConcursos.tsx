import React, { useCallback, useEffect, useState } from "react";
import "../../assets/css/concurso/filtroConcurso.css";
import type { Categoria, CategoriaReponse } from "../../services/entities/categoria/type/Categoria";
import { apiGetCategoria } from "../../services/entities/categoria/api/api.categoria";
import { ROTA } from "../../services/router/url";
import customSelectStyles, { type OptionType } from "../../assets/styles/select.Style";
import Select from "react-select";
import { Search } from "lucide-react";


export const FiltroConcursos: React.FC<{
  onSearch: (termo: string)=> void, 
  orderByChange: (orderBy: React.ChangeEvent<HTMLSelectElement>) => void,
  filterCategory: (categorias: number[]) => void
  filtersFlags: (filtersFlags: object[]) => void,
}> = ({onSearch, orderByChange, filterCategory, filtersFlags}) => {

  const [dropdownAberto, setDropdownAberto] = useState<string | null>(null);

  const [busca, setBusca] = useState("");
  const [btnCatAtivos, setBtnCatAtivos] = useState<number[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [filters, setFilters] = useState<object[]>([])
  
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
  const options = [
    { value: 'prazoInscricao,ASC', label: 'Prazo mais próximo' },
    { value: 'prazoInscricao,DESC', label: 'Prazo mais distante' },
    { value: 'createdAt,DESC', label: 'Mais recentes' },
    { value: 'createdAt,ASC', label: 'Mais antigos' },
    { value: 'titulo,ASC', label: 'Título A-Z' },
    { value: 'titulo,DESC', label: 'Título Z-A' },
  ];
  const toggleDropdown = (nome: string) => {//Atualiza o dropdown atual
    setDropdownAberto(prev => (prev === nome ? null : nome));
  };

  

  useEffect(() => {//fecha dropdown ao clicar fora
  const handleClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.filtro-container')) {
      setDropdownAberto(null);
      
    }
    
  };

  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="filtro-container">
      <div className="filtro-linha">
        
        {/* Busca */}
        <div className="filtro-item grow">
          <label className="title-field">Buscar por título</label>

        <div className="input-busca-container">
         <span className="search-icon"><Search  size={20}/></span>
          <input className="input-busca"
            type="text"
            value={busca}
            onChange={ e => setBusca(e.target.value)}
            placeholder="Buque por título, tema ou gênero..."
          />
        </div>
        </div>

        {/* Ordenação */}
        <div className="filtro-item">
          <label className="title-field">Ordenar por:</label>
          <Select<OptionType>
          className=""
          styles={
            customSelectStyles
          }
          options={options}
          onChange={(option) => {
            if (option) orderByChange({target: {value: option.value}} as any)
          }}
          classNamePrefix="react-select"
          isSearchable={false}
          placeholder="Selecione.."
          />
        </div>
        


        {/* Categoria */}
        
        <div className="filtro-item select">
          <label className="title-field">Filtrar por:</label>
         <button
            className="btn-filtro"
            onClick={() => toggleDropdown('categoria')}
          >
            Categoria {btnCatAtivos.length > 0 ? "( "+btnCatAtivos.length+" )" : ''}
         </button>
         {dropdownAberto === 'categoria' && (
          <div className="filtros-dropdown-categoria">
          <h4>Selecione as categorias</h4>

          <div className="lista-categorias">
            {categorias.map((cat) => (
              <button 
                key={cat.id} 
                onClick={()=> alternarCategoria(cat.id)}
                className={btnCatAtivos.includes(cat.id) ? 'btn-categoria-ativo' : 'btn-categoria'}
              >
                {cat.nome}
              </button>
            ))}
          </div>

          <div className="acoes-filtro">
            <button className="btn-limpar" onClick={() => setBtnCatAtivos([])} >Limpar</button>
            <button className="btn-aplicar" onClick={() => {filterCategory(btnCatAtivos); toggleDropdown('')}}>Aplicar</button>
          </div>
        </div>
          )}
        </div>
        
        {/* Botão filtros */}
        <div className="filtro-item select">
          <label className="title-field" >Filtrar por</label>
         <button
            className="btn-filtro"
            onClick={() => toggleDropdown('filtros')}
          >
            Mais opções
         </button>
         {dropdownAberto === 'filtros' && (
            <div className="filtros-dropdown">
              <h4>Custos e premiação</h4>
              <label>
                <input type="checkbox" onChange={(e)=> { setFilters(prev =>[...prev, {gratuito: e.target.checked}])}}/>
                Gratuito
              </label>

              <label>
                <input type="checkbox" onChange={(e)=> { setFilters(prev =>[...prev, {pago: e.target.checked}])}}/>
                Pago
              </label>

              <label>
                <input type="checkbox" onChange={(e)=> { setFilters(prev =>[...prev, {premioEmDinheiro: e.target.checked}])}}/>
                Prêmio em dinheiro
              </label>

              <button className="btn-aplicar" onClick={()=>{filtersFlags(filters)}}>Aplicar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};