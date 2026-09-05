import React, { useCallback, useEffect, useState } from "react";
import { apiGetCriterios } from "../../../services/entities/criterio/api/criterio.api";
import type { GrupoCriterio, GrupoCriterioPaginado, GrupoCriterioSemPaginacao } from "../../../services/entities/criterio/type/Criterio";

const CriteriosBiblioteca: React.FC = () => {

  const [criterios, setCriterios] = useState<GrupoCriterio[]>([]);

  const [loading, setLoading] = useState(true);
  const fetchCriterios = useCallback(
    async (): Promise<GrupoCriterioPaginado | null> => {
      try {
        const response = await apiGetCriterios();
        console.log("Critérios carregados com sucesso:", response.data.dados.content);
        return response.data.dados.content;
        
      } catch (error: any) {
        console.log("Erro ao buscar critérios:", error);
      }finally{
        setLoading(false);
      }
      return null;
    }, []
  )

  useEffect(() => {
    const payload = fetchCriterios();
    if(payload){
      const { content } = payload;
      setCriterios(content);
    }
  }, []);

  if(loading){ 
    return <div>Carregando critérios...</div>;
  }
  return (
    <div>
      <h1>Critérios da Avaliativos</h1>
      <p>Página de critérios da biblioteca</p>
    </div>
  );
};


export default CriteriosBiblioteca;
