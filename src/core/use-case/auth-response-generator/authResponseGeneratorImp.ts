import { AuthResponse } from '@/core/domain/auth/authResponse';
import { JWT } from '../ports';
import { AuthResponseGenerator } from './authResponseGenerator';

export class AuthResponseGeneratorImp implements AuthResponseGenerator {
	private readonly TOKEN_EXPIRATION = '5m';
	private readonly REFRESH_TOKEN_EXPIRATION = '8m';

	constructor(private readonly jwtSigner: JWT) {}

	async generateAuthResponse(email: string): Promise<false | AuthResponse> {
		const token = await this.jwtSigner.sign(email, this.TOKEN_EXPIRATION);
		const refreshToken = await this.jwtSigner.sign(
			email,
			this.REFRESH_TOKEN_EXPIRATION
		);

		if (!token || !refreshToken) {
			return false;
		}

		return {
			token: token,
			refreshToken: refreshToken,
		};
	}
}
