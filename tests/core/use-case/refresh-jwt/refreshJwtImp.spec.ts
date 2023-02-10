import { RefreshJwtImp } from '@/core/use-case/refresh-jwt';
import { mock } from 'jest-mock-extended';
import { JWT } from '@/core/use-case/ports';

describe('Refresh JWT', () => {
	const jwtSigner = mock<JWT>();
	const refreshJwt = new RefreshJwtImp(jwtSigner);

	test('Should return new token', async () => {
		const TOKEN = 'newtoken';
		jwtSigner.verify.mockResolvedValue({ email: 'email@email' });
		jwtSigner.sign.mockResolvedValue(TOKEN);

		const refreshToken = await refreshJwt.refresh('oldToken');

		expect(refreshToken).not.toBeFalsy();
		expect(refreshToken).toEqual(TOKEN);
	});

	test('Should return false if false returned from verify', async () => {
		jwtSigner.verify.mockResolvedValue(false);

		const refreshToken = await refreshJwt.refresh('oldToken');

		expect(refreshToken).toEqual(false);
	});
});
