import { UseCaseError } from '../../useCaseError';

export class UserAlreadyCreatedError extends Error implements UseCaseError {
	constructor(email: string) {
		super(`User with email ${email} already created`);
		this.name = 'UserAlreadyCreatedError';
	}
}
