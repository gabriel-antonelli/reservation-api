import { AuthResponse } from '@/core/domain/auth/authResponse';

export interface AuthResponseGenerator {
	generateAuthResponse: (email: string) => Promise<false | AuthResponse>;
}
