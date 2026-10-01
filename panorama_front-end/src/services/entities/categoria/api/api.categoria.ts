import api from "../../../axios/config.axios"

export interface SearchParams {
    page?: number;
    pageSize?: number;
    props?: string;
    order?: string;
    search?: string;
}

export const apiGetCategoria = async (url: string /*params: SearchParams*/) =>{
    const response = await api.get(url/*, {params}*/);
    return response;
}