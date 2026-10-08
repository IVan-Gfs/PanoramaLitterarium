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

        options.attachments = [ 
            {
                filename: 'logo.png',
                path: 'uploads/sistema/logo.png',
                cid: 'logo'
            }
        ]
        if(!options.from){
            throw new EmailException(
                'Erro nos dados de envio do Email',
                HttpStatus.BAD_REQUEST,
                "Campo 'from' do e-mail não informado"
            )
        }
 
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
                replyTo: 'no-reply@localhost.com',
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

            <body style="
                margin: 0;
                padding: 0;
                background-color: #eef4fa;
                font-family: Arial, Helvetica, sans-serif;
                color: #202020;
            ">

                <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="background-color: #eef4fa; padding: 40px 16px;"
                >
                    <tr>
                        <td align="center">

                            <!-- CONTAINER -->
                            <table
                                width="600"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                style="
                                    width: 100%;
                                    max-width: 600px;
                                    background-color: #ffffff;
                                    border-radius: 12px;
                                    overflow: hidden;
                                    border: 1px solid #dce7f2;
                                "
                            >

                                <!-- HEADER -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            background-color: #d6e6f7;
                                            padding: 36px 40px 32px;
                                        "
                                    >

                                        <!-- LOGO -->
                                        <img
                                            src="cid:logo"
                                            alt="Panorama Litterarium"
                                            width="150"
                                            style="
                                                display: block;
                                                width: 150px;
                                                max-width: 100%;
                                                height: auto;
                                                margin: 0 auto 24px;
                                            "
                                        />

                                        <h1 style="
                                            margin: 0;
                                            color: #1f1f1f;
                                            font-size: 25px;
                                            line-height: 1.3;
                                            font-weight: 600;
                                        ">
                                            ${title}
                                        </h1>

                                        <p style="
                                            margin: 10px 0 0;
                                            color: #4b5563;
                                            font-size: 15px;
                                            line-height: 1.5;
                                        ">
                                            Literatura, encontros e novas possibilidades.
                                        </p>

                                    </td>
                                </tr>


                                <!-- CONTENT -->
                                <tr>
                                    <td style="padding: 40px;">

                                        <p style="
                                            margin: 0 0 20px;
                                            font-size: 18px;
                                            line-height: 1.6;
                                            color: #202020;
                                        ">
                                            Olá, <strong>{{ nome }}</strong>.
                                        </p>

                                        <p style="
                                            margin: 0 0 20px;
                                            font-size: 16px;
                                            line-height: 1.8;
                                            color: #4b4b4b;
                                        ">
                                            ${message}
                                        </p>

                                        <p style="
                                            margin: 0 0 30px;
                                            font-size: 16px;
                                            line-height: 1.8;
                                            color: #4b4b4b;
                                        ">
                                            Sua conta foi criada com sucesso. A partir de agora,
                                            você poderá participar das oportunidades literárias
                                            disponíveis no Panorama Litterarium.
                                        </p>


                                        <!-- BUTTON -->
                                        <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            border="0"
                                            align="center"
                                        >
                                            <tr>
                                                <td
                                                    align="center"
                                                    style="
                                                        background-color: #202020;
                                                        border-radius: 6px;
                                                    "
                                                >
                                                    <a
                                                        href="{{ link }}"
                                                        target="_blank"
                                                        style="
                                                            display: inline-block;
                                                            padding: 14px 30px;
                                                            color: #ffffff;
                                                            text-decoration: none;
                                                            font-size: 15px;
                                                            font-weight: bold;
                                                        "
                                                    >
                                                        Acessar Panorama
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>


                                <!-- DIVIDER -->
                                <tr>
                                    <td style="padding: 0 40px;">
                                        <div style="
                                            height: 1px;
                                            background-color: #e5e7eb;
                                            font-size: 0;
                                            line-height: 0;
                                        ">
                                            &nbsp;
                                        </div>
                                    </td>
                                </tr>


                                <!-- FOOTER -->
                                <tr>
                                    <td
                                        align="center"
                                        style="
                                            padding: 28px 40px;
                                            background-color: #f8fafc;
                                        "
                                    >

                                        <p style="
                                            margin: 0 0 8px;
                                            color: #6b7280;
                                            font-size: 13px;
                                            line-height: 1.6;
                                        ">
                                            Este e-mail foi enviado automaticamente pelo
                                            Panorama Litterarium.
                                        </p>

                                        <p style="
                                            margin: 0;
                                            color: #9ca3af;
                                            font-size: 12px;
                                            line-height: 1.6;
                                        ">
                                            © ${new Date().getFullYear()} Panorama Litterarium.
                                            Todos os direitos reservados.
                                        </p>

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