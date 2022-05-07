export interface PasswordEncryptor {
	encrypt: (password: string) => Promise<string>;
	verify: (hash: string, password: string) => Promise<boolean>;
}
