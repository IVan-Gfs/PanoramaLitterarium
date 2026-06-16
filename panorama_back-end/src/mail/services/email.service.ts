import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from 'nodemailer/lib/mailer'
import { MailPayload } from "../config/mail.options";
import { EmailException } from "src/commons/exceptions/erros/email.exception";

@Injectable()
export class EmailService{
    private MailTransport: Mail;
    private readonly logger = new Logger(EmailService.name);
    constructor (private readonly configService: ConfigService){
        this.MailTransport = createTransport({
            host: this.configService.get("EMAIL_HOST"),
            port: this.configService.get("EMAIL_PORT"),
            auth: { 
                user: this.configService.get("EMAIL_USER"),
                pass: this.configService.get("EMAIL_PASSWORD"),
            },
            tls: {
                rejectUnauthorized: this.configService.get("EMAIL_TLS")
            },
            ignoreTLS: false,
        })
    }

    async sendMail(options: MailPayload){
        if(!options.from){
            throw new EmailException(
                'Erro nos dados de envio do Email',
                HttpStatus.BAD_REQUEST,
                "Campo 'from' do e-mail não informado"
            )
        }

        // context: [
        //  "nome": "Ivan",
        //  "texto": "Você efetuou o cadastro em nosso sistema",
        //  "motivo": "Utilize o link para confirmar o seu registro",
        //  "url": "http://localhost:8084"
        // ]
 
        if(options.context){
            Object.entries(options.context).forEach(([key, value]) => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");

                if(options.html){
                    options.html = options.html.replace(regex, String(value))
                }else{
                    options.text = options.text.replace(regex, String(value))
                }
            })
        }

        // if( options.template && options.context){
        //     const {html, error } = this.templateService.compile(
        //         options.template,
        //         options.context
        //     );

        //     if(error){
        //          throw new EmailException(
        //         'Erro na criação do template do Email',
        //         HttpStatus.BAD_REQUEST,
        //         "Campo 'from' do e-mail não informado"
        //     )
        //     options.html = html;
        //     }
        // }

        try {
            await this.MailTransport.sendMail({
                from: options.from,
                to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
                subject: options.subject,
                html: options.html,
                attachments: options.attachments,
            })
        } catch (error: any) {
            // Em ambiente de desenvolvimento, não bloqueamos o fluxo por falta de SMTP;
            // registramos o conteúdo do e-mail e seguimos em frente.
            const nodeEnv = process.env.NODE_ENV || this.configService.get<string>('NODE_ENV');
            this.logger.warn(`Falha no envio do email: ${error.message}`);
            if(nodeEnv === 'development' || nodeEnv === 'dev'){
                this.logger.log(`Email não enviado (dev). Para: ${options.to}. Assunto: ${options.subject}`);
                if(options.html) this.logger.log(`HTML: ${options.html}`);
                else if(options.text) this.logger.log(`Text: ${options.text}`);
                return;
            }

            throw new Error("Falha no envio do email: "+ error.message)
        }
        
    }
    
    // async avisoDeLogin(email: string, nome: string){}

    async sendRegisterEmailConfirmation(email: string, nome: string, token: string){
        const url = `http://localhost:8000/panorama-litterarium/api/v1/auth/confirmation?token=${token}`
        return this.prepararEnviar(
            email,
            "Verifique sua caixa postal de e-mail",
            "Confirmação de registro",
            "Obrigado por registrar-se em nosso sistema! Utilize o link abaixo para confirmar seu cadastro:",
            url,
            nome
        )
    }

    private async prepararEnviar(
        to: string,
        subject: string,
        title: string,
        message: string,
        url: string,
        nome: string
    ){
        const context = { nome, url, link: url, title, message };
        const html = this.generateHtml(title, message);
        const text = `Olá ${nome} \n \n ${message} \n \n Link: ${url}`

        const options: MailPayload = {
            to,
            from: this.configService.getOrThrow<string>("EMAIL_FROM"),
            subject,
            text,
            html,
            context
        }
        return this.sendMail(options);
    }
    private generateHtml(title: string, message: string) { 

        return `
                <!DOCTYPE html>
                <html lang="pt-BR">

                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${title}</title>
                </head>

                <body
                    style=" margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif; color: #333333; ">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 0;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0"
                                    style=" background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); ">
                                    <!-- HEADER -->
                                    <tr>
                                        <td
                                            style=" background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 40px; text-align: center; color: white; ">
                                            <h1 style=" margin: 0; font-size: 28px; font-weight: bold; "> ${title} </h1>
                                            <p style=" margin-top: 10px; font-size: 16px; opacity: 0.9; "> Estamos felizes em ter você
                                                conosco 🚀 </p>
                                        </td>
                                    </tr> <!-- CONTENT -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            <p style=" margin: 0 0 20px; font-size: 18px; line-height: 1.6; "> Olá, <strong>{{ nome
                                                    }}</strong> 👋 </p>
                                            <p style=" margin: 0 0 20px; font-size: 16px; line-height: 1.8; color: #555; "> ${message}
                                            </p>
                                            <p style=" margin: 0 0 30px; font-size: 16px; line-height: 1.8; color: #555; "> Sua conta
                                                foi criada com sucesso e agora você já pode acessar todos os recursos da plataforma.
                                            </p> <!-- BUTTON -->
                                            <table cellpadding="0" cellspacing="0" border="0" align="center">
                                                <tr>
                                                    <td align="center" bgcolor="#4f46e5" style=" border-radius: 8px; "> <a
                                                            href="{{ link }}" target="_blank"
                                                            style=" display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; ">
                                                            Acessar Plataforma </a> </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> <!-- FOOTER -->
                                    <tr>
                                        <td
                                            style=" padding: 30px; text-align: center; background-color: #f9fafb; color: #888; font-size: 13px; line-height: 1.6; ">
                                            <p style="margin: 0;"> Este e-mail foi enviado automaticamente. </p>
                                            <p style="margin: 8px 0 0;"> © ${new Date().getFullYear()} Sua Empresa. Todos os direitos
                                                reservados. </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>

                </html>
        `;
     }


    
       
}