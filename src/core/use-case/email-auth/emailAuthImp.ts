import { Either, left, right } from '@/shared/either';
import { Encryptor, UserRepository } from '@/core/use-case/ports';
import { EmailAuth } from '@/core/use-case/email-auth';
import { AuthResponse } from '@/core/domain/auth/authResponse';
import { AuthResponseGenerator } from '../auth-response-generator/authResponseGenerator';

export class EmailAuthImp implements EmailAuth {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly encryptor: Encryptor,
		private readonly authResponseGenerator: AuthResponseGenerator
	) {}

	async auth(
		email: string,
		password: string
	): Promise<Either<false, AuthResponse>> {
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

		const authUserResponseOrFalse =
			await this.authResponseGenerator.generateAuthResponse(email);

		if (!authUserResponseOrFalse) {
			return left(false);
		}

		return right(authUserResponseOrFalse);
	}
}
