import type { Categoria } from "../../categoria/type/Categoria";

export interface Concurso {
    id: number;
    titulo: string;
    descricao: string;
    prazoInscricao: string;
    imgCapa: string;
    categorias: Categoria[]; 
}

export interface ConcursoCreate {
    titulo: string;
    imgCapa?: string;
    descricao: string;
    qtdVencedores?: number;
    taxaInscricao?: number;
    tema?: string;
    municipio?: string;
    uf?: string;
    premiacao: string;
    prazoInscricao: string;
    limiteObras?: number;
    restricao?: string;
    etapaAtual?: number;
    limitesTexto?: string;
    linkInscricao?: string;
    linkEdital?: string;
    pdfEdital?: string;
    dataFinalizacao?: string;
    valorTotalPremios?: number;
    custoSelecionados?: number;
    grupoCriterio?: number;
    categorias: Number[];
}

export interface Organizacao {
  nomeFantasia: string;
}

export interface DetalhesConcurso {
  dados:{
    titulo: string;
    descricao:string;
    prazoInscricao: string;
    imgCapa: string;
    generoLiterario: string;
    categorias: Categoria[];
    organizacao: Organizacao[];
    linkEdital: string | null;
    restricao: string | null;
    limiteObras: number | null;
    grupoCriterio: GrupoCriterio[];
  }
}

export interface GrupoCriterio {
  nome: string;
  descricao: string;
}

export interface ConcursoPaginado {
  dados: {
    content: Concurso[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  }
}

export interface ErrosConcursos {
    titulo?: string[];
    imgCapa?: string[];
    generoLiterario?: string[];
    prazoInscricao?: string[];
    descricao?: string[];
    dataInicio?: string[];
    dataFim?: string[];
    organizacaoId?: string[];
}