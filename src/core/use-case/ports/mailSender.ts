export interface MailSender {
	send: (email: string, name?: string, token?: string) => Promise<void>;
}
