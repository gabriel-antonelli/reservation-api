import { server } from '@/app';
import { prisma } from '@/external/repositories/postgres-prisma/config/prismaClient';
import request from 'supertest';

describe('GET /v1/user/verify/:token', () => {
	const token = 'testToken';

	beforeAll(async () => {
		await prisma.user.deleteMany();
		await prisma.user.create({
			data: {
				Name: 'test',
				Email: 'test@test.com',
				Password: 'test@T123',
				Token: token,
				TokenExpireDate: new Date(3020, 12, 25),
			},
		});
	});

	beforeEach(async () => {
		await prisma.user.update({
			where: {
				Token: token,
			},
			data: {
				IsVerified: false,
			},
		});
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.$disconnect();
		server.close();
	});

	test('Should return 200 status and user is verified message', async () => {
		const response = await request(server).get(`/api/v1/user/verify/${token}`);

		const verifiedUser = await prisma.user.findUnique({
			where: {
				Token: token,
			},
			select: {
				IsVerified: true,
			},
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual('User is verified');
		expect(verifiedUser).not.toBeNull();
		expect(verifiedUser?.IsVerified).toEqual(true);
	});

	test('Should return 400 status and invalid token message', async () => {
		const response = await request(server).get(
			'/api/v1/user/verify/wrongToken'
		);

		const verifiedUser = await prisma.user.findUnique({
			where: {
				Token: token,
			},
			select: {
				IsVerified: true,
			},
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('The token is invalid');
		expect(verifiedUser).not.toBeNull();
		expect(verifiedUser?.IsVerified).toEqual(false);
	});
});
