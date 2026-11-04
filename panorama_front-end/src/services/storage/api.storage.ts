import api from "../axios/config.axios";
import { ROTA } from "../router/url";

interface GerarUploadUrl {
    fileName: string;
    contentType: string;
    fileSize: number;
    type: "capa" | "edital";
}

interface UploadUrlResponse {
    uploadUrl: string;
    fileKey: string;
    expiresIn: number;
}

export const apiGerarUploadUrl = async (dados: GerarUploadUrl) => {
    const response = await api.post<UploadUrlResponse>(
        ROTA.STORAGE.UPLOAD_URL,
        dados
    );

    return response.data;
};

export const apiEnviarArquivo = async (
    uploadUrl: string,
    arquivo: File
) => {
    const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": arquivo.type || "application/pdf",
        },
        body: arquivo,
    });

    if (!response.ok) {
        throw new Error("Não foi possível enviar o arquivo ao armazenamento.");
    }
};