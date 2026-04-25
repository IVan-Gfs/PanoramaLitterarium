import { useEffect, useState } from 'react';
import '../../assets/css/concurso/listagem.css';
import { Link } from "react-router-dom";
import { ROTA } from '../../services/router/url';
import { apiGetConcursos } from '../../services/entities/concurso/api/api.concurso';
import type { Concurso } from '../../services/entities/concurso/type/Concurso';
import { REST_CONFIG } from '../../services/constants/sistema.constants';
import { formatarData } from '../../utils/date';


export default function ConsultarConcursos ( ){

    
  const [concursos, setConcursos] = useState<Concurso[]>([]);
  const [loading, setLoading] = useState(true);
  const img_path = `${REST_CONFIG.BASE_URL}${ROTA.CONCURSO.IMAGE_PATH}`;

  useEffect(() => {
    async function fetchConcursos() {

      try {
        const response = await apiGetConcursos(`${ROTA.CONCURSO.LISTAR}`, {});
        setConcursos(response.data.dados.content);
        
      }catch(error){
        console.error("Erro ao buscar concursos:", error);
      }finally{
        setLoading(false);
      }
    }
    fetchConcursos();
  }, []);

  if(loading){
    return <div>Carregando concursos...</div>;
  }

    return (     
     <div>
        <h1>Encontre os Concursos Disponíveis</h1>

        <div className="listagem-container">
            {concursos.map((c) => (
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
                        <legend className="categoria">{c.generoLiterario.toLocaleUpperCase()}</legend>
                    </div>
                </Link>
            ))}
        </div>
     </div>

    )

}

           