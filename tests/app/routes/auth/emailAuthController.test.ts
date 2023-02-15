import { prisma } from '@/external/repositories/postgres-prisma/config/prismaClient';
import { server } from '@/app';
import request from 'supertest';

describe('POST /v1/auth/email', () => {
	beforeAll(async () => {
		await prisma.user.deleteMany();
		await prisma.user.createMany({
			data: [
				{
					Name: 'test',
					Email: 'test@test.com',
					Password: 'test@T123',
				},
				{
					Name: 'test',
					Email: 'test2@test.com',
					Password:
						'$argon2i$v=19$m=16,t=2,p=1$c29tZXNhbHQ$9aZwZFYWQDOGTmfN9/c0yQ',
					IsVerified: true,
				},
			],
		});
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.$disconnect();
		server.close();
	});

	test('Should return 200 status and token', async () => {
		const response = await request(server).post('/api/v1/auth/email').send({
			email: 'test2@test.com',
			password: 'test@T1234',
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toMatchObject({
			Authorized: true,
			token: expect.any(String),
			refreshToken: expect.any(String),
		});
	});

	test('Should return 400 status and missing param error message', async () => {
		const response = await request(server).post('/api/v1/auth/email').send({
			password: 'test@T1234',
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('Missing param: email');
	});

	test('Should return 401 status and unauthorized error message', async () => {
		const response = await request(server).post('/api/v1/auth/email').send({
			email: 'test2@test.com',
			password: 'test@T12345',
		});

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual('Unauthorized Request');
	});
});
