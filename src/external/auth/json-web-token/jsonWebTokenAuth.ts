import { DecodedJWT, JWT } from '@/core/use-case/ports';
import jwt, { Secret } from 'jsonwebtoken';

export class JsonWebTokenAuth implements JWT {
	private readonly JWT_SECRET = process.env.JWT_SECRET;

	async sign(subject: string): Promise<string> {
		return jwt.sign({ email: subject }, this.JWT_SECRET as Secret, {
			expiresIn: process.env.JWT_EXPIRATION,
		});
	}

	async verify(token: string): Promise<boolean | DecodedJWT> {
		try {
			const decoded = jwt.verify(token, this.JWT_SECRET as Secret);
			if (decoded) {
				return decoded as DecodedJWT;
			}
		} catch (error) {
			return false;
		}

		return false;
	}
}
