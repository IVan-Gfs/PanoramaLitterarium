import axios from "axios";
import { REST_CONFIG } from "../constants/sistema.constants";

const api = axios.create({
    baseURL: REST_CONFIG.BASE_URL,  
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

export default api;
