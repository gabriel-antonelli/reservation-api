import { JWT } from '@/core/use-case/ports/jwtSigner';
import jwt, { Secret } from 'jsonwebtoken';

export class JsonWebTokenSigner implements JWT {
	private readonly JWT_SECRET = process.env.JWT_SECRET;

	async sign(subject: string): Promise<string> {
		return jwt.sign({ email: subject }, this.JWT_SECRET as Secret, {
			expiresIn: '24h',
		});
	}

	async verify(token: string): Promise<boolean> {
		try {
			jwt.verify(token, this.JWT_SECRET as Secret);
		} catch (error) {
			return false;
		}

		return true;
	}
}
