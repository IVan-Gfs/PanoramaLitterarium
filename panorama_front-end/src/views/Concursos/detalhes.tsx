import { useCallback, useEffect, useState } from 'react';
import { apiGetConcursoById } from '../../services/entities/concurso/api/api.concurso';
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import type { DetalhesConcurso } from '../../services/entities/concurso/type/Concurso';
import { ROTA } from '../../services/router/url';
import { REST_CONFIG } from '../../services/constants/sistema.constants';
import { formatarData } from '../../utils/date';
import '../../assets/css/concurso/detalhesConcurso.css';
import { Trophy, FileText, LockKeyhole, ScrollText, DollarSign, Medal, MapPinned, Tag, Type, Coins } from 'lucide-react';
import setaVoltar from '../../../public/imgs/arrow-back.png';
import type { Categoria } from '../../services/entities/categoria/type/Categoria';

// Converte o valor (número ou string decimal vindo do Prisma) para moeda brasileira.
function formatarMoeda(valor: number | string | null | undefined): string {
    if (valor === null || valor === undefined || valor === "") return "Não há";
    const numero = Number(valor);
    if (Number.isNaN(numero)) return "Não há";
    return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function DetalhesConcurso() {

    const [detalhesConcurso, setDetalhesConcurso] = useState<DetalhesConcurso | null>(null);

    const img_path = `${REST_CONFIG.BASE_URL}${ROTA.CONCURSO.IMAGE_PATH}`;

    const buscarConcursoPorId = useCallback(
        async (id: number): Promise<DetalhesConcurso | null> => {
            try {
                const response = await apiGetConcursoById(id);
                return response.data;
            } catch (error: any) {
                console.log("Erro ao buscar detalhes do concurso:", error);
            }
            return null;
        }, []
    );

    const [searchParams] = useSearchParams();
    const id = Number(searchParams.get("id"));

    const caminho_lista_concursos = "/concursos";
    const navigate = useNavigate();
    const location = useLocation();

    const voltar = () => {
        if (location.key !== "default") {navigate(-1);
        } else {
            navigate(caminho_lista_concursos);
        }
    };

    useEffect(() => {
        const buscarDetalhes = async () => {
            const detalhes = await buscarConcursoPorId(id);
            setDetalhesConcurso(detalhes);
        }

        buscarDetalhes();
    }, [id]);

    const dados = detalhesConcurso?.dados as any;


    return (
        <div className="paginaDetalhes">

            <button
                type="button"
                onClick={voltar}
                className="linkVoltar"
                aria-label="Voltar para concursos"
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
                <img src={setaVoltar} alt="" className="iconeVoltar" />
            </button>

            <div className="containerPrincipal">

                <div className="topo">
                    <div className="imagem">
                        <img
                            src={dados?.imgCapa ? img_path + dados.imgCapa : "/logo_default.svg"}
                            alt="Imagem do concurso"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/logo_default.svg";
                            }}
                        />
                    </div>

                    <div className="infoTopo">
                        <div className="tags">

                            {dados?.categorias?.map((categoria: Categoria) => (
                                <span key={categoria.id} className="tag">{categoria.nome.toLocaleUpperCase()}</span>
                            ))}
                        </div>

                        <h1 className="titulo">{dados?.titulo}</h1>

                        <div className="boxInfo">
                            <span className="boxLabel">Organizador:</span>
                            <span className="boxValor">{dados?.organizacao?.nomeFantasia}</span>
                        </div>

                        <div className="linhaAcao">
                            <div className="boxInfo boxInscricao">
                                <span className="boxLabel">Inscrições até</span>
                                <span className="boxValorGrande">{formatarData(dados?.prazoInscricao)}</span>
                            </div>

                            {dados?.linkInscricao ? (
                                <a
                                    href={dados.linkInscricao}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btnInscreva btnInscrevaLink"
                                >
                                    Inscreva-se
                                </a>
                            ) : (
                                <button className="btnInscreva">Inscreva-se</button>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="divisor" />

                <section className="secao">
                    <h2 className="secaoTitulo">Descrição</h2>
                    <p className="descricaoTexto">{dados?.descricao}</p>
                </section>

                {dados?.linkEdital && (
                    <a href={dados.linkEdital} target="_blank" rel="noreferrer" className="cardEdital">
                        <span className="editalNome"><FileText size={20} /> Link do edital (PDF)</span>
                        <span className="editalAcao">Visualizar / Baixar ↗</span>
                    </a>
                )}

                <div className="gridDetalhes">
                    <div className="colunaDetalhes">
                        <div className="itemDetalhe">
                            <span className="itemIcone"><Tag /></span>
                            <div>
                                <p className="itemLabel">Tema</p>
                                <p className="itemValor">{dados?.tema}</p>
                            </div>
                        </div>

                        <div className="itemDetalhe">
                            <span className="itemIcone"><Trophy /></span>
                            <div>
                                <p className="itemLabel">Quantidade de vencedores</p>
                                <p className="itemValor">{dados?.qtdVencedores}</p>
                            </div>
                        </div>

                        <div className="itemDetalhe">
                            <span className="itemIcone"><LockKeyhole /></span>
                            <div>
                                <p className="itemLabel">Restrições</p>
                                <p className="itemValor">{dados?.restricao || "Não há"}</p>
                            </div>
                        </div>

                        <div className="itemDetalhe">
                            <span className="itemIcone"><ScrollText /></span>
                            <div>
                                <p className="itemLabel">Limite de obras</p>
                                <p className="itemValor">{dados?.limiteObras ?? "Não há"}</p>
                            </div>
                        </div>

                        <div className="itemDetalhe">
                            <span className="itemIcone"><Type /></span>
                            <div>
                                <p className="itemLabel">Limites textuais</p>
                                <p className="itemValor">{dados?.limitesTexto || "Não há"}</p>
                            </div>
                        </div>

                        {/*
                          TODO: campos ainda não presentes na resposta da API:
                          público-alvo, faixa etária.
                          Reativar quando existirem no back-end.
                        */}
                    </div>

                    <div className="colunaDetalhes">
                        <div className="itemDetalhe">
                            <span className="itemIcone"><DollarSign /></span>
                            <div>
                                <p className="itemLabel">Taxa de inscrição</p>
                                <p className="itemValor">{dados?.taxaInscricao || "Não há"}</p>
                            </div>
                        </div>

                        <div className="itemDetalhe">
                            <span className="itemIcone"><Coins /></span>
                            <div>
                                <p className="itemLabel">Custo para obras selecionadas</p>
                                <p className="itemValor">{formatarMoeda(dados?.custoSelecionados)}</p>
                            </div>
                        </div>

                        <div className="itemDetalhe">
                            <span className="itemIcone"><Medal /></span>
                            <div>
                                <p className="itemLabel">Premiação</p>
                                <p className="itemValor">{dados?.premiacao}</p>
                            </div>
                        </div>

                        {dados?.grupoCriterio?.length > 0 && (
                            <div className="criteriosBox">
                                <p className="itemLabel criteriosTitulo">⭐ Critérios avaliativos</p>
                                <table className="tabelaCriterios">
                                    <thead>
                                        <tr>
                                            <th>Título do critério</th>
                                            <th>Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dados.grupoCriterio.map((criterio: any, index: number) => (
                                            <tr key={index}>
                                                <td>{criterio.nome}</td>
                                                <td>{criterio.descricao}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cardLocalidade">
                    <span className="itemIcone"><MapPinned /></span>
                    <div>
                        <p className="itemLabel">Localidade</p>
                        <p className="itemValor">{dados?.municipio} - {dados?.uf}, Brasil</p>
                    </div>
                </div>

            </div>
        </div>
    );
}