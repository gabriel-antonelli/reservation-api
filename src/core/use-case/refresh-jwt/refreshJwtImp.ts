import { JWT } from '../ports';
import { RefreshJWT } from './refreshJwt';

export class RefreshJwtImp implements RefreshJWT {
	constructor(private readonly jwtSigner: JWT) {}

	async refresh(jwt: string): Promise<string | boolean> {
		const decodedJwt = await this.jwtSigner.verify(jwt);
		if (decodedJwt) {
			return await this.jwtSigner.sign(decodedJwt as string);
		}
		return false;
	}
}
