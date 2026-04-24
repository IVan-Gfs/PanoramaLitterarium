import '../../assets/css/concurso/listagem.css';
import { Link } from "react-router-dom";

export default function ConsultarConcursos ( ){

    const concursosMock = [
  {
    id: 1,
    titulo: "Poemas do Eu – 2025",
    imagem: "",
    prazo: "31/08/2025",
    categoria: "Poemas"
  },
  {
    id: 2,
    titulo: "37ª Noite da Poesia",
    imagem: "https://via.placeholder.com/300x180",
    prazo: "01/09/2026",
    categoria: "Poesias"
  },
  {
    id: 3,
    titulo: "Prêmio Rio de Letras – 2026 ",
    imagem: "http://localhost:8000/uploads/concursos/edital-capa-premio-rio-de-letras-121343.webp",
    prazo: "17/07/2026",
    categoria: "Contos"
  },
  {
    id: 4,
    titulo: "Concurso tempo das palavras - primeira edição 2026",
    imagem: "https://localhost:8000/uploads/image2",
    prazo: "17/10/2026",
    categoria: "Crônicas"
  },
  {
    id: 5,
    titulo: "A Menina que Sabia os Finais (Antologia) ",
    imagem: "http://localhost:8000/uploads/concursos/edital-capa-antologia-cartola-a-menina-que-sabia-os-finais-21344.webp",
    prazo: "03/05/2026",
    categoria: "Contos"
  }

  
  
];

    return (     

     <div>

        <h1>Encontre os concursos disponíveis</h1>

        <div className="listagem-container">
            {concursosMock.map((c) => (
                <Link key={c.id} to={`./detalhes`} className='item-concurso'>
                    <h2 className='titulo-concurso'>{c.titulo}</h2>
                    <img
                        src={c.imagem || "/logo_default.svg"}
                        alt="capa-concurso"
                        className='capa-concurso'
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/logo_default.svg";
                        }}
                    />
                    <div className="footer-concurso">
                        <legend className="prazo-inscricao">Inscrições até {c.prazo}</legend>
                        <legend className="categoria">{c.categoria.toLocaleUpperCase()}</legend>
                    </div>
                </Link>
            ))}
        </div>
     </div>

    )

}

           