export const confirmationTemplate = (
    title: string,
    message: string,
    loginUrl: string
) => `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #eef4fa;
    font-family: Arial, Helvetica, sans-serif;
    color: #202020;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background-color: #eef4fa; padding: 60px 16px;">

        <tr>
            <td align="center">

                <table width="500" cellpadding="0" cellspacing="0" border="0"
                    style="
                        width: 100%;
                        max-width: 500px;
                        background-color: #ffffff;
                        border: 1px solid #dce7f2;
                        border-radius: 12px;
                        overflow: hidden;
                    ">

                    <tr>
                        <td align="center"
                            style="
                                background-color: #d6e6f7;
                                padding: 32px;
                            ">

                            <img
                                src="http://localhost:8000/uploads/sistema/logo.png"
                                alt="Panorama Litterarium"
                                width="150"
                                style="
                                    display: block;
                                    width: 150px;
                                    height: auto;
                                    margin: 0 auto;
                                "
                            >

                        </td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="padding: 45px 40px;">

                            <div style="
                                width: 54px;
                                height: 54px;
                                margin: 0 auto 24px;
                                border-radius: 50%;
                                background-color: #e8f5e9;
                                color: #2e7d32;
                                font-size: 30px;
                                line-height: 54px;
                                font-weight: bold;
                            ">
                                ✓
                            </div>

                            <h1 style="
                                margin: 0 0 16px;
                                font-size: 25px;
                                font-weight: 600;
                                color: #202020;
                            ">
                                ${title}
                            </h1>

                            <p style="
                                margin: 0 0 30px;
                                font-size: 16px;
                                line-height: 1.7;
                                color: #555555;
                            ">
                                ${message}
                            </p>

                            <table cellpadding="0" cellspacing="0" border="0"
                                align="center">

                                <tr>
                                    <td align="center"
                                        style="
                                            background-color: #202020;
                                            border-radius: 6px;
                                        ">

                                        <a href="${loginUrl}"
                                            style="
                                                display: inline-block;
                                                padding: 14px 32px;
                                                color: #ffffff;
                                                text-decoration: none;
                                                font-size: 15px;
                                                font-weight: bold;
                                            ">
                                            Ir para o login
                                        </a>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="
                                padding: 24px 30px;
                                background-color: #f8fafc;
                                color: #9ca3af;
                                font-size: 12px;
                            ">

                            Panorama Litterarium<br>
                            Literatura, encontros e novas possibilidades.

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>

</html>
`;