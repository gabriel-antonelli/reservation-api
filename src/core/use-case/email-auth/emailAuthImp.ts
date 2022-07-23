import { Either, left, right } from '@/shared/either';
import { Encryptor, UserRepository, JWT } from '@/core/use-case/ports';
import { EmailAuth } from '@/core/use-case/email-auth';

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
