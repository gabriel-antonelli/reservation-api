export interface Encryptor {
	encrypt: (text: string) => Promise<string>;
	verify: (hash: string, text: string) => Promise<boolean>;
}
