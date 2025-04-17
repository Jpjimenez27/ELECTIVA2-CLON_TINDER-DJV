import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const sendMailActivateAccount = async (name, urlActive) => {
    try {
        // const htmlContent = fs.readFileSync(path.resolve(htmlTemplatePath), 'utf8');

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const templatePath = path.join(__dirname, "..", "..", "application", "templates", "SendActivateAccountTemplate.html");
        console.log(templatePath);

        const htmlTemplate = (await fs.readFile(templatePath, 'utf-8')).replace("{Nombre}","Diego Madrid");
        // Configurar el transporter con Outlook SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'flamematchapp07@gmail.com',
                pass: 'giio gakz vjoo pioi',
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        // Opciones del correo
        const mailOptions = {
            from: "flamematchapp@outlook.com",
            to: "diego.madrid@correo.tdea.edu.co",
            subject: "Activa tu cuenta❤️‍🔥🔥",
            html: htmlTemplate
        };

        // Enviar correo
        const info = await transporter.sendMail(mailOptions);

    } catch (err) {
        console.error('❌ Error al enviar el correo:', err);
    }
};