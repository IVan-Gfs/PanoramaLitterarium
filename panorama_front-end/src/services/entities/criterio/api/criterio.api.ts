import api from "../../../axios/config.axios";
import { ROTA } from "../../../router/url";

export interface SearchParams {
    page?: number;
    pageSize?: number;
    props?: string;
    order?: string;
    search?: string;
}

export const apiGetCriterios = async (params: SearchParams) =>{
    const response = await api.get(ROTA.GRUPO_CRITERIO.BASE, {params});
    return response;
}