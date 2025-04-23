import * as nodemailer from 'nodemailer';
import EventEmitter from 'node:events';
export const Events = new EventEmitter();

export const sendEmail = async (options: nodemailer.SendMailOptions) => {
    try {
        const transporter: nodemailer.Transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        await transporter.sendMail(options);
    } catch (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

Events.on('sendEmail', (data)=>{
    sendEmail(data);
});