export interface Concurso {
    id: number;
    titulo: string;
    descricao: string;
    prazoInscricao: string;
    imgCapa: string;
    generoLiterario: string;
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