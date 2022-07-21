import { MailSender } from '@/core/use-case/ports';
import { readFileSync } from 'fs';
import sgMail from '@sendgrid/mail';

export class VerificationSender implements MailSender {
	async send(email: string, name?: string, token?: string): Promise<void> {
		const sendGridKey: string = process.env.SENDGRID_API_KEY || '';
		const content = readFileSync(
			require.resolve('../verificationTemplate.html'),
			'utf8'
		);
		const message = {
			to: email,
			from: 'reservations.api.project@gmail.com',
			subject: `Verificação de email para ${name}`,
			html: content,
			substitutions: {
				validationUrl: `http://localhost:${process.env.PORT}/api/v1/auth/${token}`,
			},
		};
		sgMail.setApiKey(sendGridKey);
		sgMail.send(message);
	}
}
