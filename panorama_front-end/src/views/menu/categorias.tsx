import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import type { Categoria, CategoriaReponse } from '../../services/entities/categoria/type/Categoria';
import '../../assets/css/categoria.css';
import { ROTA } from '../../services/router/url';
import { apiGetCategoria } from '../../services/entities/categoria/api/api.categoria';
import setaVoltar from '../../../public/imgs/arrow-back.png';

export default function ListagemCategorias() {

    const [categorias, setCategorias] = useState<Categoria[] | null>([]);
    const [loading, setLoading] = useState(true);

    const buscarCategorias = useCallback(
        async (): Promise<CategoriaReponse | null> => {
            try {
                const response = await apiGetCategoria(ROTA.CATEGORIA.LISTAR);
                console.log(response.data);
                return response.data;
            } catch (error: any) {
                console.log("Erro ao buscar concursos:", error);
            } finally {
                setLoading(false);
            }
            return null;
        }, []
    );

    const caminho_lista_concursos = "/concursos";
    const navigate = useNavigate();
    const location = useLocation();

    const voltar = () => {
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate(caminho_lista_concursos);
        }
    };

    useEffect(() => {
        async function fetchCategoria() {
            const data = await buscarCategorias();

            if (data) {
                setCategorias(data.dados);
            }
        }

        fetchCategoria();
    }, [buscarCategorias]);

    if (loading) {
        return <div>Carregando categorias...</div>;
    }

    return (
        <div className="paginaCategorias">

            <h1>Conheça as categorias textuais</h1>

            <button
                type="button"
                onClick={voltar}
                className="linkVoltar"
                aria-label="Voltar para concursos"
                style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer"
                }}
            >
                <img src={setaVoltar} alt="" className="iconeVoltar" />
            </button>

            <div className="gridCategorias">
                {categorias?.map((categoria) => (
                    <div key={categoria.id} className="cardCategoria">

                        <div className="iconeCategoria">
                            <img
                                src={`/iconesCategorias/${categoria.imgCapaCategoria}`}
                                alt={categoria.nome}
                                className="capa-concurso"
                                onError={(e) => {
                                    console.error(
                                        "Erro ao carregar ícone:",
                                        e.currentTarget.src
                                    );

                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/logo.svg";
                                }}
                            />
                        </div>

                        <div className="infoCategoria">
                            <h3 className="nomeCategoria">
                                {categoria.nome}
                            </h3>

                            <p className="descricaoCategoria">
                                {categoria.descricao || "Sem descrição"}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}