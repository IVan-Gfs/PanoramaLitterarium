
import { IsIn, IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

export class GenerateUploadUrlDto {
  @IsString()
  @MaxLength(255)
  fileName?: string;

  @IsIn([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ])
  contentType?: string;

  @IsInt()
  @Min(1)
  @Max(10485760)
  fileSize?: number;

  @IsIn(['capa', 'edital'])
  type?: 'capa' | 'edital';
}
