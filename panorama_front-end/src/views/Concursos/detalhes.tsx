import React, { useCallback, useEffect, useState } from 'react';
import { apiGetConcursoById } from '../../services/entities/concurso/api/api.concurso';
import { Link, useSearchParams } from "react-router-dom";
import type { DetalhesConcurso } from '../../services/entities/concurso/type/Concurso';
import { ROTA } from '../../services/router/url';
import { REST_CONFIG } from '../../services/constants/sistema.constants';
import { formatarData } from '../../utils/date';
import '../../assets/css/concurso/detalhesConcurso.css';
import { Trophy, FileText, LockKeyhole, ScrollText, DollarSign, Medal, MapPinned, Tag } from 'lucide-react';

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

    useEffect(() => {
        const buscarDetalhes = async () => {
            const detalhes = await buscarConcursoPorId(id);
            setDetalhesConcurso(detalhes);
        }

        buscarDetalhes();
    }, [id]);

    // A API retorna campos (tema, qtdVencedores, municipio, uf, taxaInscricao,
    // premiacao, organizacao como objeto) que ainda não estão declarados na
    // interface DetalhesConcurso. Usamos "any" aqui só pra liberar o acesso
    // a esses campos extras sem mexer no type compartilhado.
    const dados = detalhesConcurso?.dados as any;

    return (
        <div className="paginaDetalhes">

            <Link to={ROTA.CONCURSO.LISTAR} className="linkVoltar">
                {"<"} Voltar para concursos
            </Link>

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
                            {dados?.generoLiterario && (
                                <span className="tag">{dados.generoLiterario}</span>
                            )}

                            {dados?.categorias?.map((categoria: any) => (
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

                            <button className="btnInscreva">Inscreva-se</button>
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

                        {/*
                          TODO: campos ainda não presentes na resposta da API:
                          limites de caracteres, público-alvo, faixa etária.
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