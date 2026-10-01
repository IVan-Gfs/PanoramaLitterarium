import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
//import { apiGetCategoria } from '../../services/entities/categoria/api/api.categoria';
import type { Categoria, CategoriaReponse } from '../../services/entities/categoria/type/Categoria';
import '../../assets/css/categoria.css';
import { ROTA } from '../../services/router/url';
import { apiGetCategoria } from '../../services/entities/categoria/api/api.categoria';
import { REST_CONFIG } from '../../services/constants/sistema.constants';

export default function ListagemCategorias() {

    const [categorias, setCategorias] = useState<Categoria[] | null>([]);
    const [loading, setLoading] = useState(true);
    const img_path = `${REST_CONFIG.BASE_URL}${ROTA.CATEGORIA.IMAGE_PATH}`;

     const buscarCategorias = useCallback(
        async (): Promise<CategoriaReponse| null> =>{
          try{
            const response = await apiGetCategoria(ROTA.CATEGORIA.LISTAR)
            console.log(response.data)
            return response.data
          }catch(error: any){
            console.log("Erro ao buscar concursos:", error);
          }finally{
            setLoading(false);
          }
          return null
        }, []
      )

   useEffect(()=>{
       async function fetchCategoria(){
         const data = await buscarCategorias()
         if(data){
           setCategorias(data.dados)  
         }
       }
       fetchCategoria()
     },[])

    if (loading) {
        return <div>Carregando categorias...</div>;
    }

    return (
        <div className="paginaCategorias">

            <h1>Conheça as categorias textuais</h1>

            <Link to="/" className="linkVoltar">
                {"<"} Voltar para concursos
            </Link>

            <div className="gridCategorias">
                {categorias?.map((categoria) => (
                    <div key={categoria.id} className="cardCategoria">
                        <div className="iconeCategoria">
                            <img
                                src={img_path+categoria.imgCapaCategoria || "/logo.svg"}
                                alt="capa-concurso"
                                className='capa-concurso'
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/logo.svg";
                                }}
                                />
                            </div>        
                        <div className="infoCategoria">
                            <h3 className="nomeCategoria">{categoria.nome}</h3>
                            <p className="descricaoCategoria">{categoria.descricao || "Sem descrição"}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}