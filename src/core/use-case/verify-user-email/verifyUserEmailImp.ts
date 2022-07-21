import { left, right } from '@/shared/either';
import { UserRepository } from '../ports';
import { ExpiredTokenError, InvalidTokenError } from './errors';
import { VerifyUserEmail } from './verifyUserEmail';
import { VerifyUserEmailResponse } from './verifyUserEmailResponse';

export class VerifyUserEmailImp implements VerifyUserEmail {
	constructor(private readonly userRepository: UserRepository) {}

	async verify(token: string): Promise<VerifyUserEmailResponse> {
		const tokenExpireDate = await this.userRepository.findTokenExpireDate(
			token
		);

		if (!tokenExpireDate) {
			return left(new InvalidTokenError());
		}

		if (new Date() > tokenExpireDate) {
			return left(new ExpiredTokenError());
		}

		return right(true);
	}
}
