const emailService = require('../compartido/enviarcorreo'); // Servicio de correo

module.exports.EnviarNotificacion = async function (receptor, mensaje) {
    try {
        if (!receptor) {
            throw new Error('El correo del receptor es obligatorio.');
        }
        if (!mensaje) {
            throw new Error('El mensaje de notificación es obligatorio.');
        }

        // Plantilla HTML del correo
        const plantillaHTML = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background-color: #4fd124;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .app-title {
                        font-size: 22px;
                        margin: 0;
                    }
                    .content {
                        padding: 20px;
                        color: #333333;
                        line-height: 1.6;
                    }
                    .footer {
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 10px;
                        font-size: 12px;
                        color: #666666;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1 class="app-title">Fundación Favorita</h1>
                    </div>
                    <div class="content">
                        <center><h2>Notificación</h2></center>
                        <p>Estimado usuario,</p>
                        <p>${mensaje}</p>
                        <p>Gracias por su atención.</p>
                    </div>
                    <div class="footer">
                        <p>Este correo es generado automáticamente, por favor no respondas.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Enviar el correo
        const resultado = await emailService.EnviarCorreo({
            strAsunto: 'Notificación - Fundación Favorita',
            strBody: Buffer.from(plantillaHTML).toString('base64'),
            lstArchivosAdjuntos: [],
            lstReceptores: [{ email: receptor }]
        });

        if (!resultado.success) {
            throw new Error(resultado.mensaje);
        }

        return {
            success: true,
            mensaje: 'Notificación enviada correctamente.'
        };
    } catch (error) {
        console.error('Error al enviar la notificación:', error.message);
        return {
            success: false,
            mensaje: 'Error: ' + error.message
        };
    }
};
