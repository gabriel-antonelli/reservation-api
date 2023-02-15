export interface DecodedJWT {
	email: string;
	iat?: string;
	exp?: string;
}

export interface JWT {
	sign: (subject: string, expiration: string) => Promise<string>;
	verify: (token: string) => Promise<boolean | DecodedJWT>;
}
