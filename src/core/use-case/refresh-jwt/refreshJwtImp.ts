import { DecodedJWT, JWT } from '../ports';
import { RefreshJWT } from './refreshJwt';

export class RefreshJwtImp implements RefreshJWT {
	constructor(private readonly jwtSigner: JWT) {}

	async refresh(jwt: string): Promise<string | boolean> {
		const decodedJwt = await this.jwtSigner.verify(jwt);
		if (decodedJwt) {
			const email = (decodedJwt as DecodedJWT).email;
			return await this.jwtSigner.sign(email);
		}
		return false;
	}
}
