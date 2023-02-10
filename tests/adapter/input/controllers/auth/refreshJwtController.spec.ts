import { RefreshJWT } from '@/core/use-case/refresh-jwt';
import { mock } from 'jest-mock-extended';
import { RefreshJwtController } from '@/adapter/input/controllers/auth/refreshJwtController';
import { JwtRequest } from '@/adapter/input/controllers/auth/data/JwtRequest';

describe('Refresh Jwt Controller', () => {
	const refreshJwt = mock<RefreshJWT>();
	const refreshJwtController = new RefreshJwtController(refreshJwt);
	const requestBody = {
		authUserEmail: 'test@test.com',
	};

	test('Should return 200 status and refresh token', async () => {
		const TOKEN = 'refreshedtoken';
		refreshJwt.refresh.mockResolvedValue(TOKEN);

		const response = await refreshJwtController.handle(requestBody);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			RefreshToken: TOKEN,
		});
	});

	test('Should return 400 and missing param error message', async () => {
		const response = await refreshJwtController.handle({} as JwtRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('Missing param: authUserEmail');
	});

	test('Should return 401 and unauthorized request error message', async () => {
		refreshJwt.refresh.mockResolvedValue('');
		const response = await refreshJwtController.handle(requestBody);

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual('Unauthorized Request');
	});

	test('Should return 500 and internal server error message', async () => {
		refreshJwt.refresh.mockRejectedValue(new Error('test exception'));
		const response = await refreshJwtController.handle(requestBody);

		expect(response.statusCode).toEqual(500);
		expect(response.body).toEqual('Internal Server Error');
	});
});
