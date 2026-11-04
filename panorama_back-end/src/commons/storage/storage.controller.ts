
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { StorageService } from './storage.service';
import { GenerateUploadUrlDto } from './dto/generate-upload-url.dto';
import { ROTA } from '../constants/url.sistema';

@Controller(ROTA.STORAGE.BASE)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post(ROTA.STORAGE.UPLOAD_URL)
  async generateUploadUrl(@Body() dto: GenerateUploadUrlDto) {
    const folder = dto.type === 'capa'
      ? 'concursos/capas'
      : 'concursos/editais';

    if (dto.type === 'capa' && dto.contentType === 'application/pdf') {
        throw new BadRequestException('Capas devem ser imagens.');
    }

    if (dto.type === 'edital' && dto.contentType !== 'application/pdf') {
        throw new BadRequestException('Editais devem ser arquivos PDF.');
    }  
    return this.storageService.generateUploadUrl(
      dto.fileName || '',
      dto.contentType || '',
      folder,
    );
  }
}
