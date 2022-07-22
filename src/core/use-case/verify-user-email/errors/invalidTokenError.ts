import { UseCaseError } from '../../useCaseError';

export class InvalidTokenError extends Error implements UseCaseError {
	constructor() {
		super('The token is invalid');
		this.name = 'InvalidTokenError';
	}
}
