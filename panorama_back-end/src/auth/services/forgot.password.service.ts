// import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
// import { ConfigService } from '@nestjs/config';
// import * as crypto from 'crypto';
// import { UsuarioService } from 'src/usuario/services/usuario.service';


// @Injectable()
// export class ForgotPasswordService {
//     constructor(
//         private readonly usersService: UsuarioService,
//         private readonly mailerService: MailerService,
//         private readonly configService: ConfigService,
//     ) {}

//     async execute(email: string): Promise<void> {
//         const user = await this.usersService.findOneByEmail(email);

//         // Segurança: Evita revelar se o e-mail existe ou não no sistema
//         if (!user) return;

//         // Gera um token único de 64 caracteres hexadecimais
//         const resetToken = crypto.randomBytes(32).toString('hex');
        
//         // Define a validade do token para 15 minutos a partir de agora
//         const resetExpires = new Date(Date.now() + 1000 * 60 * 15);

//         // Atualiza as suas colunas reais no banco de dados
//         await this.usersService.update(user.id, {
//             recovery_token: resetToken,
//             token_expires: resetExpires,
//         });

//         // Monta o link que redireciona o usuário para a tela do Front-end
//         const frontUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
//         const resetLink = `${frontUrl}/reset-password?token=${resetToken}`;

//         // Dispara o e-mail usando o seu e-mail real configurado no MailerModule
//         await this.mailerService.sendMail({
//             to: user.email,
//             subject: 'Redefinição de Senha - Panorama Litterarium',
//             replyTo: 'nao-responda@panorama-litterarium.com',
//             html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
//                     <h2 style="color: #4f46e5;">Recuperação de Senha</h2>
//                     <p>Olá!</p>
//                     <p>Você solicitou a redefinição de sua senha. Use o botão abaixo para cadastrar uma nova credencial. Este link é válido por 15 minutos.</p>
//                     <div style="text-align: center; margin: 30px 0;">
//                         <a href="${resetLink}" target="_blank" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">Redefinir Minha Senha</a>
//                     </div>
//                     <p style="color: #666; font-size: 12px;">Se você não solicitou essa alteração, ignore este e-mail.</p>
//                 </div>
//             `,
//         });
//     }
// }
