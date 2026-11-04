
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetCategoria } from "../../categoria/api/api.categoria";
import { ROTA } from "../../../router/url";
import { apiPostConcurso } from "../api/api.concurso";
import type { CategoriaReponse } from "../../categoria/type/Categoria";
import type { ConcursoCreate } from "../type/Concurso";
import {apiGerarUploadUrl, apiEnviarArquivo} from "../../../storage/api.storage";


// Ajuste estes caminhos para os arquivos existentes no seu projeto.


export interface ImagemSelecionada {
  arquivo: File;
  url: string;
}

export interface CategoriaOpcao {
  id: string;
  nome: string;
}

export type TipoEdital = "link" | "pdf";

export const etapas = [
  "Identidade",
  "Regras e inscrições",
  "Estrutura do concurso",
  "Premiação",
];

function extrairListaCategorias(resposta: CategoriaReponse): CategoriaReponse[] {
  let dados = resposta as any; 

  // Compatível com respostas que vêm diretamente como array
  // ou encapsuladas em data.
  for (let i = 0; i < 3 && dados && !Array.isArray(dados); i++) {
    dados = dados.data ?? dados.resultado ?? dados.items;
  }
  
  return Array.isArray(dados) ? dados : [];
}

export function useCriarConcurso() {
  const navigate = useNavigate();
  const inputImagemRef = useRef<HTMLInputElement>(null);
  const inputEditalRef = useRef<HTMLInputElement>(null);

  const [etapaAtual, setEtapaAtual] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<ImagemSelecionada | null>(null);
  const [prazoInscricao, setPrazoInscricao] = useState("");

  const [tema, setTema] = useState("");
  const [tipoEdital, setTipoEdital] = useState<TipoEdital>("link");
  const [editalLink, setEditalLink] = useState("");
  const [editalArquivo, setEditalArquivo] = useState<File | null>(null);
  const [formularioInscricao, setFormularioInscricao] = useState("");
  const [limiteObras, setLimiteObras] = useState("1");
  const [limitesObra, setLimitesObra] = useState("");
  const [restricoes, setRestricoes] = useState("");
  const [taxaInscricao, setTaxaInscricao] = useState("");

  const [categorias, setCategorias] = useState<CategoriaOpcao[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [buscaCategoria, setBuscaCategoria] = useState("");
  const [listaCategoriasAberta, setListaCategoriasAberta] = useState(false);
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);

  const [premiacao, setPremiacao] = useState("");
  const [premiacaoEmDinheiro, setPremiacaoEmDinheiro] = useState(false);

  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const [erroImagem, setErroImagem] = useState("");
  const [erroEdital, setErroEdital] = useState("");
  const [erroValidacao, setErroValidacao] = useState("");
  const [erroRequisicao, setErroRequisicao] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      setCarregandoCategorias(true);

      try {
        const resposta = await apiGetCategoria(ROTA.CATEGORIA.LISTAR);
      
        const lista = extrairListaCategorias(resposta.data.dados ?? resposta.data);
        console.log("Lista de categorias extraída:", lista);
        if (!ativo) return;

        const opcoes = lista
          .map((item: any) => {
            const id = item.id ?? item.idCategoria;
            const nome =
              item.nome ??
              item.titulo ??
              item.descricao ??
              item.nomeCategoria;

            if (id == null || !nome) return null;

            return {
              id: String(id),
              nome: String(nome),
            } as CategoriaOpcao;
          })
          .filter((item): item is CategoriaOpcao => item !== null);

        setCategorias(opcoes);
      } catch {
        if (ativo) {
          setErroRequisicao("Não foi possível carregar as categorias.");
        }
      } finally {
        if (ativo) setCarregandoCategorias(false);
      }
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (imagem) URL.revokeObjectURL(imagem.url);
    };
  }, [imagem]);

  const categoriasFiltradas = useMemo(() => {
    const termo = buscaCategoria.trim().toLocaleLowerCase("pt-BR");

    return categorias.filter(
      (categoria) =>
        !categoriasSelecionadas.includes(categoria.id) &&
        categoria.nome.toLocaleLowerCase("pt-BR").includes(termo),
    );
  }, [categorias, categoriasSelecionadas, buscaCategoria]);

  function atualizarImagem(arquivo?: File) {
    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      setErroImagem("Selecione um arquivo de imagem válido.");
      return;
    }

    setErroImagem("");
    setImagem({
      arquivo,
      url: URL.createObjectURL(arquivo),
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
    setImagem(null);
    setErroImagem("");
  }

  function selecionarEditalPdf(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (!arquivo) return;

    if (
      arquivo.type !== "application/pdf" &&
      !arquivo.name.toLowerCase().endsWith(".pdf")
    ) {
      setErroEdital("Selecione um arquivo PDF válido.");
      return;
    }

    setErroEdital("");
    setEditalArquivo(arquivo);
  }

  function formatarMoeda(valor: string): string {
    const digitos = valor.replace(/\D/g, "");
    if (!digitos) return "";

    return (Number(digitos) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function atualizarTaxaInscricao(valor: string) {
    setTaxaInscricao(valor.replace(/\D/g, ""));
  }

  function alternarCategoria(id: string) {
    setCategoriasSelecionadas((atuais) =>
      atuais.includes(id)
        ? atuais.filter((categoriaId) => categoriaId !== id)
        : [...atuais, id],
    );

    setBuscaCategoria("");
    setErroValidacao("");
  }

  function removerCategoria(id: string) {
    setCategoriasSelecionadas((atuais) =>
      atuais.filter((categoriaId) => categoriaId !== id),
    );
  }

  function validarEtapa(etapa: number): boolean {
    setErroValidacao("");

    if (etapa === 0) {
      if (!titulo.trim()) {
        setErroValidacao("Informe o título do concurso.");
        return false;
      }

      if (!descricao.trim()) {
        setErroValidacao("Informe a descrição do concurso.");
        return false;
      }
    }

    if (etapa === 1) {
    if (!prazoInscricao) {
        setErroValidacao("Informe o prazo de inscrição.");
        return false;
    }

    if (new Date(`${prazoInscricao}T23:59:59`) < new Date()) {
        setErroValidacao("O prazo de inscrição não pode estar no passado.");
        return false;
    }
}

    if (etapa === 2 && categoriasSelecionadas.length === 0) {
      setErroValidacao("Selecione pelo menos uma categoria.");
      return false;
    }

    if (etapa === 3 && !premiacao.trim()) {
      setErroValidacao("Descreva a premiação do concurso.");
      return false;
    }

    return true;
  }

  function proximaEtapa() {
    if (!validarEtapa(etapaAtual)) return;

    setEtapaAtual((atual) => Math.min(atual + 1, etapas.length - 1));
  }

  function etapaAnterior() {
    setErroValidacao("");
    setEtapaAtual((atual) => Math.max(atual - 1, 0));
  }

  function cancelarCriacao() {
    setModalCancelarAberto(false);
    navigate("../concursos/listagem");
  }

  async function confirmarCriacao() {
    if (!validarEtapa(3) || enviando) return;

    if (tipoEdital === "pdf" && !editalArquivo) {
        setErroEdital("Selecione o arquivo PDF do edital.");
        return;
    }

    if (
        limiteObras.trim() === "" ||
        !Number.isInteger(Number(limiteObras)) ||
        Number(limiteObras) < 1
    ) {
        setErroValidacao("Informe um limite de obras válido.");
        return;
    }

    setEnviando(true);
    setErroRequisicao("");

    try {
        let imgCapa: string | undefined;
        let pdfEdital: string | undefined;

        if (imagem) {
            const { uploadUrl, fileKey } = await apiGerarUploadUrl({
                fileName: imagem.arquivo.name,
                contentType: imagem.arquivo.type,
                fileSize: imagem.arquivo.size,
                type: "capa",
            });

            await apiEnviarArquivo(uploadUrl, imagem.arquivo);

            imgCapa = fileKey;
        }

        if (tipoEdital === "pdf" && editalArquivo) {
            const { uploadUrl, fileKey } = await apiGerarUploadUrl({
                fileName: editalArquivo.name,
                contentType: "application/pdf",
                fileSize: editalArquivo.size,
                type: "edital",
            });

            await apiEnviarArquivo(uploadUrl, editalArquivo);

            pdfEdital = fileKey;
        }

        const concurso: ConcursoCreate = {
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            premiacao: premiacao.trim(),
            prazoInscricao: new Date(
                `${prazoInscricao}T12:00:00`
            ).toISOString(),
            tema: tema.trim(),
            limiteObras: Number(limiteObras),
            limitesTexto: limitesObra.trim(),
            taxaInscricao: taxaInscricao
                ? Number(taxaInscricao) / 100
                : 0,
            restricao: restricoes.trim(),
            linkInscricao: formularioInscricao.trim(),
            categorias: categoriasSelecionadas
                .map(Number)
                .filter((item) => !isNaN(item) && item > 0),

            ...(imgCapa ? { imgCapa } : {}),

            ...(tipoEdital === "link" && editalLink.trim()
                ? { linkEdital: editalLink.trim() }
                : {}),

            ...(pdfEdital ? { pdfEdital } : {}),
        };

        await apiPostConcurso(concurso);

        navigate("../concursos/listagem");

    } catch (erro: any) {
        console.error(
            "Erro ao criar concurso:",
            erro?.response?.data ?? erro
        );

        const mensagem = erro?.response?.data?.message;

        setErroRequisicao(
            Array.isArray(mensagem)
                ? mensagem.join(" | ")
                : mensagem ??
                    erro?.message ??
                    "Não foi possível criar o concurso. Verifique os dados e tente novamente."
        );

    } finally {
        setEnviando(false);
    }
}

  return {
    etapas,
    etapaAtual,
    setEtapaAtual,
    inputImagemRef,
    inputEditalRef,

    titulo,
    setTitulo,
    descricao,
    setDescricao,
    prazoInscricao,
    setPrazoInscricao,
    imagem,
    selecionarImagem,
    arrastarImagem,
    soltarImagem,
    removerImagem,
    erroImagem,

    tema,
    setTema,
    tipoEdital,
    setTipoEdital,
    editalLink,
    setEditalLink,
    editalArquivo,
    setEditalArquivo,
    selecionarEditalPdf,
    erroEdital,
    setErroEdital,

    formularioInscricao,
    setFormularioInscricao,
    limiteObras,
    setLimiteObras,
    limitesObra,
    setLimitesObra,
    restricoes,
    setRestricoes,
    taxaInscricao,
    atualizarTaxaInscricao,
    formatarMoeda,

    categorias,
    categoriasSelecionadas,
    categoriasFiltradas,
    buscaCategoria,
    setBuscaCategoria,
    listaCategoriasAberta,
    setListaCategoriasAberta,
    carregandoCategorias,
    alternarCategoria,
    removerCategoria,

    premiacao,
    setPremiacao,
    premiacaoEmDinheiro,
    setPremiacaoEmDinheiro,

    modalCancelarAberto,
    setModalCancelarAberto,
    erroValidacao,
    erroRequisicao,
    enviando,
    proximaEtapa,
    etapaAnterior,
    cancelarCriacao,
    confirmarCriacao,
  };
}
