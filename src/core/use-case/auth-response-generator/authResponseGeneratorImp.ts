import { AuthResponse } from '@/core/domain/auth/authResponse';
import { JWT } from '../ports';
import { AuthResponseGenerator } from './authResponseGenerator';

export class AuthResponseGeneratorImp implements AuthResponseGenerator {
	constructor(private readonly jwtSigner: JWT) {}

	async generateAuthResponse(email: string): Promise<false | AuthResponse> {
		const token = await this.jwtSigner.sign(email, '5m');
		const refreshToken = await this.jwtSigner.sign(email, '8m');

		if (!token || !refreshToken) {
			return false;
		}

		return {
			token: token,
			refreshToken: refreshToken,
		};
	}
}
