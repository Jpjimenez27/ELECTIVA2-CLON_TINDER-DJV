import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const sendMailActivateAccount = async (name, urlActive) => {
    try {


        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const templatePath = path.join(__dirname, "..", "..", "application", "templates", "SendActivateAccountTemplate.html");
        const htmlTemplate = (await fs.readFile(templatePath, 'utf-8')).replace("{Nombre}","Diego Madrid");
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

        const mailOptions = {
            from: "flamematchapp07@gmail.com",
            to: "diego.madrid@correo.tdea.edu.co",
            subject: "Activa tu cuenta❤️‍🔥🔥",
            html: htmlTemplate
        };

        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        throw new Error("Error inesperado enviando correo");
        
    }
};