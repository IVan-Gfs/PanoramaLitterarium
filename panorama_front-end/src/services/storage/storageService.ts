import api from "../axios/config.axios";

interface GenerateUploadUrlRequest {
  fileName: string;
  contentType: string;
  fileSize: number;
  type: 'capa' | 'edital';
}

interface GenerateUploadUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresIn: number;
}

export async function apiGenerateUploadUrl(
  data: GenerateUploadUrlRequest,
): Promise<GenerateUploadUrlResponse> {
  const response = await api.post<GenerateUploadUrlResponse>(
    '/storage/upload-url',
    data,
  );

  return response.data;
}

export async function apiUploadFile(
  uploadUrl: string,
  file: File,
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Não foi possível enviar o arquivo ao armazenamento.');
  }
}
