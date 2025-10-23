import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioServiceCreate {
  getHello(): string {
    return 'Vamos criar um usuário?';
  }
}
