import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const sendMailActivateAccount = async (password) => {
    try {
        // const htmlContent = fs.readFileSync(path.resolve(htmlTemplatePath), 'utf8');
        const htmlContent = "<h1>Hola jajajajajajaja</h1>";

        // Configurar el transporter con Outlook SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: 'flamematchapp@outlook.com',
                pass: 'Diego123',
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        // Opciones del correo
        const mailOptions = {
            from: "flamematchapp@outlook.com",
            to: "diego.madrid@correo.tdea.edu.co",
            subject: "Activar cuentica fi fafa",
            html: htmlContent
        };

        // Enviar correo
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Correo enviado a ${mailOptions.to}: ${info.messageId}`);
    } catch (err) {
        console.error('❌ Error al enviar el correo:', err);
    }
};