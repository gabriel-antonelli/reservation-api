import { JWT } from '@/core/use-case/ports/jwtSigner';
import jwt, { Secret } from 'jsonwebtoken';

export class JsonWebTokenSigner implements JWT {
	async sign(subject: string): Promise<string> {
		return jwt.sign({ email: subject }, process.env.JWT_SECRET as Secret, {
			expiresIn: '24h',
		});
	}
}
