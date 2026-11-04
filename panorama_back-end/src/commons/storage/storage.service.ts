
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getPresignedUrl } from '@tigrisdata/storage';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

@Injectable()
export class StorageService {
  private readonly config;

  constructor(private readonly configService: ConfigService) {
    this.config = {
      bucket: this.configService.getOrThrow<string>(
        'TIGRIS_STORAGE_BUCKET',
      ),
      accessKeyId: this.configService.getOrThrow<string>(
        'TIGRIS_STORAGE_ACCESS_KEY_ID',
      ),
      secretAccessKey: this.configService.getOrThrow<string>(
        'TIGRIS_STORAGE_SECRET_ACCESS_KEY',
      ),
      endpoint: this.configService.getOrThrow<string>(
        'TIGRIS_STORAGE_ENDPOINT',
      ),
    };
  }

  async generateUploadUrl(
    fileName: string,
    contentType: string,
    folder: string,
  ) {
    const extension = extname(fileName).toLowerCase();
    const fileKey = `${folder}/${randomUUID()}${extension}`;

    const result = await getPresignedUrl(fileKey, {
        operation: 'put',
        expiresIn: 300,
        config: this.config,
    });

    if (result.error || !result.data) {
      throw new InternalServerErrorException(
        'Não foi possível gerar a URL de upload.',
      );
    }

    return {
      uploadUrl: result.data.url,
      fileKey,
      expiresIn: result.data.expiresIn,
    };
  }

  async generateDownloadUrl(fileKey: string) {
    const result = await getPresignedUrl(fileKey, {
      operation: 'get',
      expiresIn: 3600,
      config: this.config,
    });

    if (result.error || !result.data) {
      throw new InternalServerErrorException(
        'Não foi possível gerar a URL de download.',
      );
    }

    return {
      downloadUrl: result.data.url,
      expiresIn: result.data.expiresIn,
    };
  }
}
