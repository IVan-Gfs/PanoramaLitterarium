


import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import '../../../assets/css/concurso/criarConcurso.css';
import { ArrowBigRight, ArrowUpWideNarrow, CloudUpload, Image, Info } from "lucide-react";

interface ImagemSelecionada {
    arquivo: File;
    url: string;
}

const etapas: string[] = [
    "Identidade",
    "Regras e inscrições",
    "Estrutura do concurso",
    "Premiação",
];

export default function CriarConcursoPortal() {
    const navigate = useNavigate();
    const inputImagemRef = useRef<HTMLInputElement>(null);

    const [etapaAtual, setEtapaAtual] = useState<number>(0);
    const [titulo, setTitulo] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [imagem, setImagem] = useState<ImagemSelecionada | null>(null);
    const [modalCancelarAberto, setModalCancelarAberto] =
        useState<boolean>(false);
    const [erroImagem, setErroImagem] = useState<string>("");

    function atualizarImagem(arquivo?: File) {
        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            setErroImagem("Selecione um arquivo de imagem válido.");
            return;
        }

        setErroImagem("");

        setImagem((imagemAnterior) => {
            if (imagemAnterior) {
                URL.revokeObjectURL(imagemAnterior.url);
            }

            return {
                arquivo,
                url: URL.createObjectURL(arquivo),
            };
        });
    }

    function selecionarImagem(event: ChangeEvent<HTMLInputElement>) {
        atualizarImagem(event.currentTarget.files?.[0]);
        event.currentTarget.value = "";
    }

    function arrastarImagem(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    function soltarImagem(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault();
        atualizarImagem(event.dataTransfer.files?.[0]);
    }

    function removerImagem() {
        setImagem((imagemAnterior) => {
            if (imagemAnterior) {
                URL.revokeObjectURL(imagemAnterior.url);
            }

            return null;
        });

        setErroImagem("");
    }

    function cancelarCriacao() {
        if (imagem) {
            URL.revokeObjectURL(imagem.url);
        }

        navigate("../concursos/listagem");
    }

    function proximaEtapa() {
        setEtapaAtual((etapa) =>
            Math.min(etapa + 1, etapas.length - 1)
        );
    }

    return (
        <div className="criar-concurso">
            <header className="criacao-header">
                <h1>Publicação do concurso</h1>
            </header>

            <nav
                className="criacao-etapas"
                aria-label="Etapas da criação do concurso"
            >
                {etapas.map((etapa, index) => (
                    <div
                        className={`criacao-etapa ${
                            index === etapaAtual ? "ativa" : ""
                        } ${
                            index < etapaAtual ? "concluida" : ""
                        }`}
                        key={etapa}
                    >
                        <div className="etapa-indicador">
                            {index < etapaAtual ? "✓" : index + 1}
                        </div>

                        <span>{etapa}</span>
                    </div>
                ))}
            </nav>

            <main className="criacao-conteudo">
                {etapaAtual === 0 ? (
                    <>

                        <section className="identidade-grid">
                            <div className="criacao-card dados-card">
                                <div className="card-titulo">
                                    <Info/>
                                    <h3>Informações básicas</h3>
                                </div>

                                <div className="campo">
                                    <label htmlFor="titulo-concurso">
                                        Título <span>*</span>
                                    </label>

                                    <input
                                        id="titulo-concurso"
                                        type="text"
                                        value={titulo}
                                        onChange={(event) =>
                                            setTitulo(event.currentTarget.value)
                                        }
                                        placeholder="Ex.: Prêmio Panorama de Poesia 2026"
                                        maxLength={100}
                                    />

                                    <div className="contador">
                                        {titulo.length}/100
                                    </div>
                                </div>

                                <div className="campo">
                                    <label htmlFor="descricao-concurso">
                                        Descrição <span>*</span>
                                    </label>

                                    <textarea
                                        id="descricao-concurso"
                                        value={descricao}
                                        onChange={(event) =>
                                            setDescricao(
                                                event.currentTarget.value
                                            )
                                        }
                                        placeholder="Apresente seu concurso, seus objetivos e o que espera dos participantes."
                                        maxLength={500}
                                        rows={5}
                                    />

                                    <div className="contador">
                                        {descricao.length}/500
                                    </div>
                                </div>
                            </div>

                            <div className="criacao-card imagem-card">
                                <div className="card-titulo">
                                    <Image/>
                                    <h3>Imagem de capa</h3>
                                </div>

                                
                                <div className="imagem-layout">
                                    <button
                                        type="button"
                                        className="imagem-upload"
                                        onClick={() =>
                                            inputImagemRef.current?.click()
                                        }
                                        onDragOver={arrastarImagem}
                                        onDrop={soltarImagem}
                                    >
                                        <input
                                            ref={inputImagemRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={selecionarImagem}
                                            hidden
                                        />

                                         <CloudUpload/>
                                        <strong>
                                            Clique para enviar
                                            <br />
                                            ou arraste uma imagem
                                        </strong>

                                        <small>
                                            PNG, JPG ou WEBP
                                            <br />
                                            Tamanho recomendado: 1200×628px
                                        </small>
                                    </button>

                                    <div className="imagem-preview">
                                        {imagem ? (
                                            <>
                                                <img
                                                    src={imagem.url}
                                                    alt="Pré-visualização da imagem do concurso"
                                                />

                                                <button
                                                    type="button"
                                                    className="imagem-remover"
                                                    onClick={removerImagem}
                                                    aria-label="Remover imagem"
                                                    title="Remover imagem"
                                                >
                                                    ×
                                                </button>
                                            </>
                                        ) : (
                                            <div className="imagem-vazia">
                                                <span>▧</span>
                                                <p>
                                                    A imagem selecionada
                                                    aparecerá aqui.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {erroImagem && (
                                    <p className="erro-imagem" role="alert">
                                        {erroImagem}
                                    </p>
                                )}

                                {imagem && (
                                    <div className="imagem-arquivo">
                                        <span title={imagem.arquivo.name}>
                                            {imagem.arquivo.name}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                inputImagemRef.current?.click()
                                            }
                                        >
                                            Substituir imagem
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="criacao-card etapa-futura">
                        <h2>
                            {etapaAtual + 1}. {etapas[etapaAtual]}
                        </h2>

                        <p>
                            Esta etapa será implementada posteriormente.
                        </p>
                    </section>
                )}
            </main>

            <footer className="criacao-footer">
                <button
                    type="button"
                    className="botao-cancelar"
                    onClick={() => setModalCancelarAberto(true)}
                >
                    Cancelar
                </button>

                <div className="footer-direita">
                    <button
                        type="button"
                        className="botao-proximo"
                        onClick={proximaEtapa}
                        disabled={etapaAtual === etapas.length - 1}
                    >
                        Próximo passo
                        <ArrowBigRight/>
                    </button>
                </div>
            </footer>

            {modalCancelarAberto && (
                <div
                    className="modal-overlay"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setModalCancelarAberto(false);
                        }
                    }}
                >
                    <section
                        className="modal-cancelar"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-cancelar-titulo"
                    >
                        <div className="modal-alerta-icone">!</div>

                        <h2 id="modal-cancelar-titulo">
                            Cancelar criação do concurso?
                        </h2>

                        <p>
                            Todo o progresso realizado será perdido. Os dados
                            preenchidos e a imagem selecionada não serão
                            salvos.
                        </p>

                        <div className="modal-acoes">
                            <button
                                type="button"
                                className="botao-manter"
                                onClick={() =>
                                    setModalCancelarAberto(false)
                                }
                            >
                                Continuar editando
                            </button>

                            <button
                                type="button"
                                className="botao-confirmar-cancelamento"
                                onClick={cancelarCriacao}
                            >
                                Sim, cancelar
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
