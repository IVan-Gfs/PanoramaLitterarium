import api from "../../../axios/config.axios";
import { ROTA } from "../../../router/url";

export interface SearchParams {
    page?: number;
    pageSize?: number;
    props?: string;
    order?: string;
    search?: string;
}

export const apiGetConcursos = async (url: string, params: SearchParams) =>{
    const response = await api.get(url, {params});
    return response;
}

export const apiGetConcursoById = async (idConcurso: number) => {
    const response = await api.get(`${ROTA.CONCURSO.POR_ID}/${idConcurso}`);
    return response;
}