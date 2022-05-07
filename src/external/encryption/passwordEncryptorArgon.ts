import { PasswordEncryptor } from '@/core/use-case/ports';
import { hash, verify } from 'argon2';

export class PasswordEcryptorArgon implements PasswordEncryptor {
	async encrypt(password: string): Promise<string> {
		return await hash(password);
	}

	async verify(hash: string, password: string): Promise<boolean> {
		return verify(hash, password);
	}
}
