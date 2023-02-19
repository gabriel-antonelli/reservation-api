import { AuthResponseGeneratorImp } from '@/core/use-case/auth-response-generator';
import { mock } from 'jest-mock-extended';
import { JWT } from '@/core/use-case/ports';

describe('Auth Response Generator', () => {
	const jwtSigner = mock<JWT>();
	const authResponseGenerator = new AuthResponseGeneratorImp(jwtSigner);

	test('Should return new token', async () => {
		const TOKEN = 'newtoken';
		const REFRESH_TOKEN = 'newrefreshtoken';
		jwtSigner.sign
			.mockResolvedValueOnce(TOKEN)
			.mockResolvedValue(REFRESH_TOKEN);

		const authResponse = await authResponseGenerator.generateAuthResponse(
			'oldToken'
		);

		expect(authResponse).not.toBeFalsy();
		expect(authResponse).toMatchObject({
			token: TOKEN,
			refreshToken: REFRESH_TOKEN,
		});
	});

	test('Should return false(no token returned)', async () => {
		const REFRESH_TOKEN = 'newrefreshtoken';
		jwtSigner.sign.mockResolvedValueOnce('').mockResolvedValue(REFRESH_TOKEN);

		const authResponse = await authResponseGenerator.generateAuthResponse(
			'oldToken'
		);

		expect(authResponse).toBeFalsy();
	});
});
