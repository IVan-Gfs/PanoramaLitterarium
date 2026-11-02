
import { useCriarConcurso } from '../../../services/entities/concurso/hook/useConcursoCriar';
import {
    ArrowBigRight,
    Ban,
    BookText,
    CircleDollarSign,
    ClipboardPen,
    CloudUpload,
    FileText,
    Image,
    Info,
    SquareDashedText,
    Search,
    ArrowBigLeft,
    Plus,
    CircleX,
    ChevronDown,
    ChevronUp,
    Trophy,
    Megaphone,
} from "lucide-react";
import '../../../assets/css/concurso/criarConcurso.css';
export default function CriarConcursoPortal() {
    const c = useCriarConcurso();

    const categoriasSelecionadas = c.categorias.filter((categoria) =>
        c.categoriasSelecionadas.includes(categoria.id),
    );

    return (
        <main className="criar-concurso">
            <header className="criacao-header">
                <div>
                    <h1>Criar concurso</h1>
                    <p>Preencha as informações para publicar seu concurso literário.</p>
                </div>
            </header>

            <nav className="criacao-etapas" aria-label="Etapas da criação">
                {c.etapas.map((etapa, indice) => (
                    <div
                        key={etapa}
                        className={`criacao-etapa ${indice === c.etapaAtual ? "ativa" : ""
                            } ${indice < c.etapaAtual ? "concluida" : ""}`}
                    >
                        <span className="etapa-indicador">
                            {indice < c.etapaAtual ? "✓" : indice + 1}
                        </span>
                        <span>{etapa}</span>
                    </div>
                ))}
            </nav>

            <section className="criacao-conteudo">
                {c.etapaAtual === 0 && (
                    <>
                        <div className="criacao-introducao">
                            <h2>Identidade do concurso</h2>
                            <p>Apresente seu concurso aos participantes.</p>
                        </div>

                        <section className="identidade-grid">
                            <div className="criacao-card dados-card">
                                <div className="card-titulo">
                                    <Info />
                                    <h3>Informações básicas</h3>
                                </div>

                                <div className="campo">
                                    <label htmlFor="titulo-concurso">
                                        Título <span className="obrigatorio">*</span>
                                    </label>

                                    <input
                                        id="titulo-concurso"
                                        type="text"
                                        value={c.titulo}
                                        onChange={(event) => c.setTitulo(event.currentTarget.value)}
                                        placeholder="Ex.: Prêmio Panorama de Poesia 2026"
                                        maxLength={180}
                                        required
                                    />

                                    <div className="contador">{c.titulo.length}/180</div>
                                </div>

                                <div className="campo">
                                    <label htmlFor="descricao-concurso">
                                        Descrição <span className="obrigatorio">*</span>
                                    </label>

                                    <textarea
                                        id="descricao-concurso"
                                        value={c.descricao}
                                        onChange={(event) => c.setDescricao(event.currentTarget.value)}
                                        placeholder="Apresente seu concurso, seus objetivos e o que espera dos participantes."
                                        maxLength={5000}
                                        rows={5}
                                        required
                                    />

                                    <div className="contador">{c.descricao.length}/5000</div>
                                </div>
                            </div>

                            <div className="criacao-card imagem-card">
                                <div className="card-titulo">
                                    <Image />
                                    <h3>Imagem de capa</h3>
                                </div>

                                <div className="imagem-layout">
                                    <button
                                        type="button"
                                        className="imagem-upload"
                                        onClick={() => c.inputImagemRef.current?.click()}
                                        onDragOver={c.arrastarImagem}
                                        onDrop={c.soltarImagem}
                                    >
                                        <CloudUpload />

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

                                    <input
                                        ref={c.inputImagemRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={c.selecionarImagem}
                                        hidden
                                    />

                                    <div className="imagem-preview">
                                        {c.imagem ? (
                                            <>
                                                <img
                                                    src={c.imagem.url}
                                                    alt="Pré-visualização da imagem do concurso"
                                                />

                                                <button
                                                    type="button"
                                                    className="imagem-remover"
                                                    onClick={c.removerImagem}
                                                    aria-label="Remover imagem"
                                                    title="Remover imagem"
                                                >
                                                    ×
                                                </button>
                                            </>
                                        ) : (
                                            <div className="imagem-vazia">
                                                <span>▧</span>
                                                <p>A imagem selecionada aparecerá aqui.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {c.erroImagem && (
                                    <p className="erro-imagem" role="alert">
                                        {c.erroImagem}
                                    </p>
                                )}

                                {c.imagem && (
                                    <div className="imagem-arquivo">
                                        <span title={c.imagem.arquivo.name}>
                                            {c.imagem.arquivo.name}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => c.inputImagemRef.current?.click()}
                                        >
                                            Substituir imagem
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}

                {c.etapaAtual === 1 && (
                    <>
                        <div className="criacao-introducao">
                            <h2>Regras e inscrições</h2>
                            <p>Informe como os participantes poderão se inscrever.</p>
                        </div>
                        <section className="regras-grid">
                        <div className="criacao-card">
                            <div className="card-titulo">
                                <BookText/>
                                <h3>Edital</h3>
                            </div>
                            <p className="card-descricao">
                                Informe o link do edital ou envie o documento em PDF.
                            </p>

                            <div className="opcoes-edital">
                                <button
                                    type="button"
                                    className={c.tipoEdital === "link" ? "selecionada" : ""}
                                    onClick={() => {
                                        c.setTipoEdital("link");
                                        c.setErroEdital("");
                                    }}
                                >
                                    Inserir link
                                </button>
                                <button
                                    type="button"
                                    className={c.tipoEdital === "pdf" ? "selecionada" : ""}
                                    onClick={() => {
                                        c.setTipoEdital("pdf");
                                        c.setErroEdital("");
                                    }}
                                >
                                    Enviar PDF
                                </button>
                            </div>

                            {c.tipoEdital === "link" ? (
                                <div className="campo">
                                    <label htmlFor="edital-link">Link do edital</label>
                                    <input
                                        id="edital-link"
                                        type="url"
                                        value={c.editalLink}
                                        onChange={(e) => c.setEditalLink(e.currentTarget.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            ) : (
                                <div className="campo">
                                    <label htmlFor="edital-pdf">Arquivo do edital</label>
                                    <input
                                        ref={c.inputEditalRef}
                                        id="edital-pdf"
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={c.selecionarEditalPdf}
                                    />
                                    {c.editalArquivo && (
                                        <div className="edital-arquivo-selecionado">
                                            <span>{c.editalArquivo.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => c.setEditalArquivo(null)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {c.erroEdital && (
                                <p className="campo-erro">{c.erroEdital}</p>
                            )}
                        </div>

                        <div className="criacao-card">
                            <div className="card-titulo">
                                <ClipboardPen/>
                                <h3>Formulário de inscrição</h3>
                            </div>
                            <div className="campo">
                                <label htmlFor="formulario-inscricao">
                                    Link do formulário
                                </label>
                                <input
                                    id="formulario-inscricao"
                                    type="url"
                                    value={c.formularioInscricao}
                                    onChange={(e) =>
                                        c.setFormularioInscricao(e.currentTarget.value)
                                    }
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                        <div className="criacao-card">
                            <div className="card-titulo">
                               <SquareDashedText/>
                                <h3>Limites da obra</h3>
                            </div>
                            <p className="card-descricao">
                                Descreva livremente os limites de extensão. Você pode definir
                                regras diferentes para cada categoria.
                            </p>
                            <div className="campo">
                                <label htmlFor="limites-obra">Limites e especificações</label>
                                <textarea
                                    id="limites-obra"
                                    value={c.limitesObra}
                                    onChange={(e) => c.setLimitesObra(e.currentTarget.value)}
                                    placeholder={
                                        "Ex.: Poesias: até 40 versos.\nContos: entre 1.000 e 5.000 palavras.\nCrônicas: até 3.000 caracteres."
                                    }
                                    rows={5}
                                    maxLength={2000}
                                />
                                <div className="contador">{c.limitesObra.length}/2000</div>
                            </div>
                        </div>
                        <div className="criacao-card">
                            <div className="card-titulo">
                                <Ban />
                                <h3>Restrições</h3>
                            </div>
                            <div className="campo">
                                <label htmlFor="restricoes">Regras para participação</label>
                                <textarea
                                    id="restricoes"
                                    value={c.restricoes}
                                    onChange={(e) => c.setRestricoes(e.currentTarget.value)}
                                    placeholder="Ex.: Apenas residentes do estado de São Paulo."
                                    rows={4}
                                    maxLength={3000}
                                />
                            </div>
                        </div>
                        <div className="regras-grid">
                            <div className="criacao-card">
                                <div className="card-titulo">
                                    <FileText />
                                    <h3>Limite de obras</h3>
                                </div>
                                <div className="campo">
                                    <label htmlFor="limite-obras">
                                        Obras por participante
                                    </label>
                                    <input
                                        id="limite-obras"
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={c.limiteObras}
                                        onChange={(e) =>
                                            c.setLimiteObras(e.currentTarget.value.replace(/\D/g, ""))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="criacao-card taxa-card">
                                <div className="card-titulo">
                                    <CircleDollarSign />
                                    <h3>Taxa de inscrição</h3>
                                </div>
                                <div className="campo">
                                    <label htmlFor="taxa-inscricao">Valor</label>
                                    <input
                                        id="taxa-inscricao"
                                        inputMode="numeric"
                                        value={c.formatarMoeda(c.taxaInscricao)}
                                        onChange={(e) =>
                                            c.atualizarTaxaInscricao(e.currentTarget.value)
                                        }
                                        placeholder="R$ 0,00"
                                    />
                                </div>
                            </div>
                        </div>    
                        </section>
                    </>
                )}

                {c.etapaAtual === 2 && (
                    <>
                        <div className="criacao-introducao">
                            <h2>Estrutura do concurso</h2>
                            <p>
                                Selecione todas as categorias literárias aceitas no concurso.
                            </p>
                        </div>

                        <div className="criacao-card">
                            <div className="card-titulo">
                               <Search/>
                                <h3>
                                    Categorias aceitas<span className="obrigatorio">*</span>
                                </h3>
                            </div>
                            <p className="card-descricao">
                                Pesquise e selecione uma ou mais categorias.
                            </p>

                            <div className="seletor-categorias">
                                <label htmlFor="busca-categoria">Buscar categoria</label>
                                {c.categoriasSelecionadas.length > 0 && (
                                    <div className="categorias-selecionadas">
                                        {categoriasSelecionadas.map((categoria) => (
                                            <span className="categoria-tag" key={categoria.id}>
                                                {categoria.nome}
                                                <button
                                                    className='remove-categoria'
                                                    type="button"
                                                    aria-label={`Remover ${categoria.nome}`}
                                                    onClick={() => c.removerCategoria(categoria.id)}
                                                >
                                                    <CircleX/>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <input
                                    id="busca-categoria"
                                    type="search"
                                    value={c.buscaCategoria}
                                    onFocus={() => c.setListaCategoriasAberta(true)}
                                    onChange={(e) => {
                                        c.setBuscaCategoria(e.currentTarget.value);
                                        c.setListaCategoriasAberta(true);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            c.setListaCategoriasAberta(false);
                                        }
                                    }}
                                    placeholder="Digite para pesquisar..."
                                    autoComplete="off"
                                />

                                {c.listaCategoriasAberta && (
                                    <div className="lista-categorias-concurso">
                                        {c.carregandoCategorias ? (
                                            <p>Carregando categorias...</p>
                                        ) : c.categoriasFiltradas.length > 0 ? (
                                            c.categoriasFiltradas.map((categoria) => (
                                                <button
                                                    type="button"
                                                    key={categoria.id}
                                                    onClick={() => c.alternarCategoria(categoria.id)}
                                                >
                                                    <span>{categoria.nome}</span>
                                                    <Plus/>
                                                </button>
                                            ))
                                        ) : (
                                            <p>Nenhuma categoria encontrada.</p>
                                        )}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="botao-secundario"
                                    onClick={() =>
                                        c.setListaCategoriasAberta((aberta) => !aberta)
                                    }
                                >
                                    {c.listaCategoriasAberta
                                        ? <ChevronDown/>
                                        : <ChevronUp/>}
                                </button>

                                

                                
                            </div>
                        </div>
                    </>
                )}

                {c.etapaAtual === 3 && (
                    <>
                        <div className="criacao-introducao">
                            <h2>Premiação</h2>
                            <p>Explique o que os participantes poderão receber.</p>
                        </div>

                        <div className="criacao-card">
                            <div className="card-titulo">
                                <Trophy/>
                                <h3>
                                    Premiação <span className="obrigatorio">*</span>
                                </h3>
                            </div>

                            <div className="campo">
                                <label htmlFor="premiacao">
                                    Descrição da premiação
                                </label>
                                <textarea
                                    id="premiacao"
                                    value={c.premiacao}
                                    onChange={(e) => c.setPremiacao(e.currentTarget.value)}
                                    placeholder="Descreva os prêmios, certificados, publicações ou outras formas de reconhecimento..."
                                    rows={6}
                                    maxLength={5000}
                                    required
                                />
                                <div className="contador">{c.premiacao.length}/5000</div>
                            </div>

                            <label className="check-premiacao-dinheiro">
                                <input
                                    type="checkbox"
                                    checked={c.premiacaoEmDinheiro}
                                    onChange={(e) =>
                                        c.setPremiacaoEmDinheiro(e.currentTarget.checked)
                                    }
                                />
                                <span>Inclui premiação em dinheiro?</span>
                            </label>
                        </div>

                        <div className="resumo-categorias">
                            <strong>Categorias selecionadas</strong>
                            <div className="categorias-selecionadas">
                                {categoriasSelecionadas.map((categoria) => (
                                    <span className="categoria-tag" key={categoria.id}>
                                        {categoria.nome}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {c.erroValidacao && (
                    <p className="mensagem-erro" role="alert">
                        {c.erroValidacao}
                    </p>
                )}

                {c.erroRequisicao && (
                    <p className="mensagem-erro" role="alert">
                        {c.erroRequisicao}
                    </p>
                )}

                <footer className="criacao-footer">
                    <button
                        type="button"
                        className="botao-cancelar"
                        onClick={() => c.setModalCancelarAberto(true)}
                        disabled={c.enviando}
                    >
                        Cancelar
                    </button>

                    <div className="footer-direita">
                        {c.etapaAtual > 0 && (
                            <button
                                type="button"
                                className="botao-voltar"
                                onClick={c.etapaAnterior}
                                disabled={c.enviando}
                            >
                                <ArrowBigLeft />
                                Voltar
                            </button>
                        )}

                        {c.etapaAtual < c.etapas.length - 1 ? (
                            <button
                                type="button"
                                className="botao-proximo"
                                onClick={c.proximaEtapa}
                            >
                                Próximo
                                <ArrowBigRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="botao-principal"
                                onClick={c.confirmarCriacao}
                                disabled={c.enviando}
                            >
                                {c.enviando ? "Publicando..." : "Publicar"}
                                <Megaphone/>
                            </button>
                        )}
                    </div>
                </footer>
            </section>

            {c.modalCancelarAberto && (
                <div className="modal-overlay">
                    <div
                        className="modal-cancelar"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-cancelar"
                    >
                        <h2 id="titulo-modal-cancelar">Cancelar publicação?</h2>
                        <p>
                            Se você sair agora, as informações preenchidas serão perdidas.
                            Deseja realmente cancelar?
                        </p>
                        <div className="modal-acoes">
                            <button
                                type="button"
                                className="botao-principal"
                                onClick={() => c.setModalCancelarAberto(false)}
                            >
                                Continuar editando
                            </button>
                            <button
                                type="button"
                                className="botao-cancelar"
                                onClick={c.cancelarCriacao}
                            >
                                Sim, cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
