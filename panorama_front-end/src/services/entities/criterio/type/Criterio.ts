export interface Criterio {
    id: number;
    nome: string;
    descricao: string;
    pontuacaoMax: number;
    concursoId: number;
}
export interface CriterioDetalhado {
    id: number;
    nome: string;
    descricao: string;
    pontuacaoMax: number;
}
export interface ErrosCriterios {
    nome?: string[];
    descricao?: string[];
    pontuacaoMax?: string[];
    concursoId?: string[];
}

export interface GrupoCriterio {
    id: number;
    nome: string;
}
export interface GrupoCriterioDetalhado {
    id: number;
    nome: string;
    criterio: Criterio[];
}
export interface GrupoCriterioPaginado {
  dados: {
    content: GrupoCriterio[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  }
}
export interface ErrosGrupoCriterio {
    nome?: string[];
}
