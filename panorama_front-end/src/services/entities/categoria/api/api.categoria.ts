import api from "../../../axios/config.axios"

export const apiGetCategoria = async (url: string) =>{
    
    const response = await api.get(url)
    
    return response;
    
}