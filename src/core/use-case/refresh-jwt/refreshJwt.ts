export interface RefreshJWT {
	refresh: (jwt: string) => Promise<boolean | string>;
}
