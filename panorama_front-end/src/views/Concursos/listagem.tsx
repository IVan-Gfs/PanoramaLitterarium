import React, { useCallback, useEffect, useState } from 'react';
import '../../assets/css/concurso/listagem.css';
import { Link } from "react-router-dom";
import { ROTA } from '../../services/router/url';
import { apiGetConcursos, type SearchParams } from '../../services/entities/concurso/api/api.concurso';
import type { Concurso, ConcursoPaginado } from '../../services/entities/concurso/type/Concurso';
import { REST_CONFIG } from '../../services/constants/sistema.constants';
import { formatarData } from '../../utils/date';
import { FiltroConcursos } from '../../components/search/filtroConcursos';
import Pagination from '../../components/pagination/Pagination';
import { ItemsPerPage } from '../../components/pagination/itemsPerPage';


export default function ConsultarConcursos ( ){

    
  const [concursos, setConcursos] = useState<Concurso[]>([]);

  //Paginação
  const [recordPerPages, setRecordPerPages] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(6);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>([]);

  //Filtragem
  const [props, setProps] = useState<string>("titulo");
  const [order, setOrder] = useState<string>("asc");
  const [orderBy, setOrderBy] = useState<string>("id");
  const [searchTerm, setSearchTerm] = useState<string>('');

  

  const [loading, setLoading] = useState(true);

  const img_path = `${REST_CONFIG.BASE_URL}${ROTA.CONCURSO.IMAGE_PATH}`;

  const buscarTodosConcursos = useCallback(
    async (params: SearchParams): Promise<ConcursoPaginado| null> => {
      try {
        const reponse = await apiGetConcursos(`${ROTA.CONCURSO.LISTAR}`, params);
        return reponse.data;
      }catch(error: any){
        console.log("Erro ao buscar concursos:", error);
      }finally{
        setLoading(false);
      }
      return null;
    }, []
  );

  //monitorar mudança dos elementos, disparando chamada para api
  useEffect(() => {
    async function fetchConcursos() {

      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        orderBy: orderBy,
        searchTerm: searchTerm === '' ? null : searchTerm,
        categorias: categoriasSelecionadas.length > 0 ? categoriasSelecionadas.join(',') : undefined
      };
      const data = await buscarTodosConcursos(params);

      if(data){
        const { content, page, pageSize, totalPages } = data.dados;

        setConcursos(content);
        setCurrentPage(page);
        setPageSize(pageSize);
        setTotalPages(totalPages);
      }
    }
    fetchConcursos();
  }, [currentPage, pageSize, searchTerm, order, props, categoriasSelecionadas]);

  if(loading){ 
    return <div>Carregando concursos...</div>;
  }

  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Number(pageNumber));
  };

  const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setPageSize(value);
    setRecordPerPages(value);
    setCurrentPage(0); // volta
  }

  const handleOrderFieldSelect = (event: React.ChangeEvent<HTMLSelectElement> ) => {
    const [propsOrder, order] =  event.target.value.split(',');
    console.log(event.target.value)
    setOrderBy(propsOrder);
    setOrder(order);
  }
  
  const handleFilterCategory = (ids: number[]) => {
  setCategoriasSelecionadas(ids);
  setCurrentPage(1); // opcional: volta para a primeira página ao filtrar
  };

    return (     
     <div>
      <h1>Encontre os Concursos Disponíveis</h1>

       <FiltroConcursos 
        onSearch={setSearchTerm}
        orderByChange={handleOrderFieldSelect}
        filterCategory={handleFilterCategory}
       />

        <div className='filtro'></div>

        <div className="listagem-container">
      
            { concursos.map((c) => (
                <Link key={c.id} to={`./detalhes`} className='item-concurso'>
                    <h2 className='titulo-concurso'>{c.titulo}</h2>
                    <img
                        src={img_path+c.imgCapa || "/logo_default.svg"}
                        alt="capa-concurso"
                        className='capa-concurso'
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/logo_default.svg";
                        }}
                    />
                    <div className="footer-concurso">
                        <legend className="prazo-inscricao">Inscrições até {formatarData(c.prazoInscricao)}</legend>
                        <div className='categorias'>
                            {c.categorias.map((cat) => (
                                <legend key={cat.id} className="categoria">{cat.nome.toLocaleUpperCase()}</legend>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <ItemsPerPage 
        onChange={handleRecordsPerPageChange}
        itemValue={recordPerPages}
        />
     </div>

    )

}

           