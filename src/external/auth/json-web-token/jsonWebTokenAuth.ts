import { JWT } from '@/core/use-case/ports/jwtAuth';
import jwt, { Secret } from 'jsonwebtoken';

export class JsonWebTokenAuth implements JWT {
	private readonly JWT_SECRET = process.env.JWT_SECRET;

	async sign(subject: string): Promise<string> {
		return jwt.sign({ email: subject }, this.JWT_SECRET as Secret, {
			expiresIn: '24h',
		});
	}

	async verify(token: string): Promise<boolean | string> {
		let decoded = null;

		try {
			decoded = jwt.verify(token, this.JWT_SECRET as Secret);
		} catch (error) {
			return false;
		}

		if (decoded) {
			return decoded as string;
		}
		return false;
	}
}
