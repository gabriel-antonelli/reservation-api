import { AuthResponseGenerator } from '@/core/use-case/auth-response-generator/authResponseGenerator';
import { AuthResponseGeneratorImp } from '@/core/use-case/auth-response-generator/authResponseGeneratorImp';
import { JsonWebTokenAuth } from '@/external/auth/json-web-token/jsonWebTokenAuth';

export const makeAuthResponseGenerator = (): AuthResponseGenerator => {
	const jwtSigner = new JsonWebTokenAuth();
	return new AuthResponseGeneratorImp(jwtSigner);
};
