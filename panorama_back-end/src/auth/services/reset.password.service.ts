// import { Injectable, BadRequestException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { UsuarioService } from 'src/usuario/services/usuario.service';


// @Injectable()
// export class ResetPasswordService {
//     constructor(
//         private readonly usersService: UsuarioService,
//     ) {}

//     async execute(token: string, novaSenha: string): Promise<void> {
//         // Busca o usuário usando o recovery_token
//         const user = await this.usersService.findOneByResetToken(token);

//         if (!user) {
//             throw new BadRequestException('Token de redefinição inválido ou já utilizado');
//         }

//         // Valida se o token expirou comparando com o token_expires da sua tabela
//         const dataAtual = new Date();
//         if (user.token_expires && dataAtual > user.token_expires) {
//             throw new BadRequestException('O link de redefinição expirou. Solicite um novo.');
//         }

//         // Criptografia segura da nova senha (import * as bcrypt)
//         const salt = await bcrypt.genSalt(10);
//         const hashedNovaSenha = await bcrypt.hash(novaSenha, salt);

//         // Atualiza a coluna "senha" e zera os tokens para impedir reutilização
//         await this.usersService.update(user.id, {
//             senha: hashedNovaSenha,
//             recovery_token: null,
//             token_expires: null,
//         });
//     }
// }
