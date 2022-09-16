export interface JWT {
	sign: (subject: string) => Promise<string>;
	verify: (token: string) => Promise<boolean>;
}
