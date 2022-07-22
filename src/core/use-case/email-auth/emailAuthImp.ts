import { Either, left, right } from '@/shared/either';
import { Encryptor, UserRepository } from '../ports';
import { JWT } from '../ports/jwtSigner';
import { EmailAuth } from './emailAuth';

export class EmailAuthImp implements EmailAuth {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly encryptor: Encryptor,
		private readonly jwtSigner: JWT
	) {}

	async auth(email: string, password: string): Promise<Either<false, string>> {
		const hashedPassword = await this.userRepository.findPasswordByEmail(email);

		if (!hashedPassword) {
			return left(false);
		}

		const isPasswordValid = await this.encryptor.verify(
			hashedPassword,
			password
		);

		if (!isPasswordValid) {
			return left(false);
		}

		const token = await this.jwtSigner.sign(email);

		return right(token);
	}
}
