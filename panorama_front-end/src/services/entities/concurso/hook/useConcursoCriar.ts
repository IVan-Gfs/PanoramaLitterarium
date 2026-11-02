
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetCategoria } from "../../categoria/api/api.categoria";
import { ROTA } from "../../../router/url";
import { apiPostConcurso } from "../api/api.concurso";
import type { CategoriaReponse } from "../../categoria/type/Categoria";


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

    setEnviando(true);
    setErroRequisicao("");

    try {
      const data = new FormData();

      data.append("titulo", titulo.trim());
      data.append("descricao", descricao.trim());
      data.append("categorias", JSON.stringify(categoriasSelecionadas));
      data.append("premiacao", premiacao.trim());
      data.append("premiacaoEmDinheiro", String(premiacaoEmDinheiro));
      data.append("tipoEdital", tipoEdital);
      data.append("editalLink", tipoEdital === "link" ? editalLink.trim() : "");
      data.append("formularioInscricao", formularioInscricao.trim());
      data.append("limiteObras", limiteObras);
      data.append("limitesObra", limitesObra.trim());
      data.append("restricoes", restricoes.trim());

      // A taxa é guardada em centavos para evitar erros de máscara.
      data.append(
        "taxaInscricao",
        taxaInscricao ? String(Number(taxaInscricao) / 100) : "0",
      );

      if (imagem) data.append("imgCapa", imagem.arquivo);

      if (tipoEdital === "pdf" && editalArquivo) {
        data.append("editalArquivo", editalArquivo);
      }

      await apiPostConcurso(data);
      navigate("../concursos/listagem");
    } catch (erro: any) {
      setErroRequisicao(
        erro?.response?.data?.message ??
          "Não foi possível criar o concurso. Verifique os dados e tente novamente.",
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
    imagem,
    selecionarImagem,
    arrastarImagem,
    soltarImagem,
    removerImagem,
    erroImagem,

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
