export interface RefreshJWT {
	refresh: (email: string) => Promise<string>;
}
