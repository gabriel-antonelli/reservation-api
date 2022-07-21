import { UseCaseError } from '../../useCaseError';

export class ExpiredTokenError extends Error implements UseCaseError {
	constructor() {
		super('The token has expired');
		this.name = 'ExpiredTokenError';
	}
}
