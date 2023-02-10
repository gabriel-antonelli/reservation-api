import { server } from '@/app';
import { JsonWebTokenAuth } from '@/external/auth/json-web-token/jsonWebTokenAuth';
import request from 'supertest';

describe('GET /v1/auth/refresh-token', () => {
	afterAll(async () => {
		server.close();
	});

	test('Should return 200 status and token', async () => {
		const token = await new JsonWebTokenAuth().sign('test@test.com');

		const response = await request(server)
			.get('/api/v1/auth/refresh-token')
			.set({ 'X-AUTH': token });

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject({
			RefreshToken: expect.any(String),
		});
	});

	test('Should return 401 status and unauthorized request message', async () => {
		const response = await request(server).get('/api/v1/auth/refresh-token');

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual('Unauthorized request');
	});
});
