// Variables de entorno desde .env
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'Contacto <onboarding@resend.dev>';
const TO_EMAIL = process.env.TO_EMAIL;

module.exports = async function handler(req, res) {
  if (!RESEND_API_KEY) {
    return res.status(500).json({
      error: 'RESEND_API_KEY no está configurada en las variables de entorno'
    });
  }

  if (!TO_EMAIL) {
    return res.status(500).json({
      error: 'TO_EMAIL no está configurada en las variables de entorno'
    });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email no válido'
      });
    }

    const emailContent = {
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `Nuevo mensaje de ${name} a través del formulario de contacto`,
      html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <title>Nuevo Mensaje de tu sección de Contacto</title>
    <style>
        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .content {
                padding: 15px !important;
            }
            .header {
                padding: 20px 15px 15px 15px !important;
            }
            .text-content {
                font-size: 16px !important;
                line-height: 1.5 !important;
            }
            .small-text {
                font-size: 14px !important;
            }
        }
        
        body {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        table {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;">
        <tr>
            <td style="padding: 20px 10px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px; width: 100%;">
                    <tr>
                        <td align="center" class="header" style="padding: 30px 20px 20px 20px; border-bottom: 2px solid #667eea;">
                            <h1 style="color: #333333; margin: 0; font-size: 24px; font-weight: bold; line-height: 1.3;">Nuevo Mensaje de tu sección de Contacto</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content" style="padding: 20px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="background-color: #eef2ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                        <h2 style="color: #4a5dcb; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: bold; line-height: 1.3;">Información del Remitente</h2>
                                        <p class="text-content" style="margin: 0 0 12px 0; color: #555555; line-height: 1.6; font-size: 16px;"><strong>Nombre:</strong> ${name}</p>
                                        <p class="text-content" style="margin: 0; color: #555555; line-height: 1.6; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 500;">${email}</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height: 20px; line-height: 20px; font-size: 1px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="background-color: #ffffff; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px;">
                                        <h2 style="color: #4a5dcb; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: bold; line-height: 1.3;">Mensaje</h2>
                                        <div class="text-content" style="margin: 0; color: #333333; line-height: 1.7; font-size: 16px; word-wrap: break-word;">${message.replace(/\n/g, '<br>')}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height: 20px; line-height: 20px; font-size: 1px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                                        <p class="small-text" style="margin: 0 0 8px 0; color: #6c757d; font-size: 14px; line-height: 1.5;">Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
                                        <p class="small-text" style="margin: 0; color: #6c757d; font-size: 14px; line-height: 1.5; font-weight: 500;">Fecha: ${new Date().toLocaleString('es-UY', { timeZone: 'America/Montevideo' })}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `,
      text: `
Nuevo Mensaje de tu sección de Contacto

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

Fecha: ${new Date().toLocaleString('es-UY', { timeZone: 'America/Montevideo' })}
      `
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailContent),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de Resend:', errorData);

      return res.status(500).json({
        error: 'Error al enviar el email. Intenta nuevamente.'
      });
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente',
      id: data.id
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
}