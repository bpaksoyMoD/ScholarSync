const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        // In a real app, these would come from process.env
        this.transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email", // Mock SMTP service for testing
            port: 587,
            secure: false,
            auth: {
                user: "test_user",
                pass: "test_pass",
            },
        });
    }

    async sendEmail(to, subject, text) {
        try {
            const info = await this.transporter.sendMail({
                from: '"ScholarSync Agent" <agent@scholarsync.ai>',
                to: to,
                subject: subject,
                text: text,
                html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
            });

            console.log("Message sent: %s", info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error("Email sending failed:", error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new EmailService();
