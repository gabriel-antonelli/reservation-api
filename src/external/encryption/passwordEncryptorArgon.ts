import { Encryptor } from '@/core/use-case/ports';
import { hash, verify } from 'argon2';

export class PasswordEcryptorArgon implements Encryptor {
	async encrypt(text: string): Promise<string> {
		return await hash(text);
	}

	async verify(hash: string, text: string): Promise<boolean> {
		return await verify(hash, text);
	}
}
