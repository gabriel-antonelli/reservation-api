import { JWT } from '../ports';
import { RefreshJWT } from './refreshJwt';

export class RefreshJwtImp implements RefreshJWT {
	constructor(private readonly jwtSigner: JWT) {}

	async refresh(email: string): Promise<string> {
		return await this.jwtSigner.sign(email);
	}
}
