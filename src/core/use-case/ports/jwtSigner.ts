export interface JWT {
	sign: (subject: string) => Promise<string>;
}
