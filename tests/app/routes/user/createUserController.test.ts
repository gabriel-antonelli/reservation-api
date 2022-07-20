import { server } from '@/app';
import { prisma } from '@/external/repositories/postgres-prisma/config/prismaClient';
import request from 'supertest';

describe('POST /v1/user', () => {
	beforeEach(async () => {
		await prisma.user.deleteMany();
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.$disconnect();
		server.close();
	});

	test('Should return 200 and create user', async () => {
		const response = await request(server).post('/api/v1/user').send({
			name: 'test',
			email: 'test@test.com',
			password: 'test@T123',
		});
		const user = await prisma.user.findUnique({
			where: {
				Email: 'test@test.com',
			},
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual('Created user test');
		expect(user).not.toBeNull();
		expect(user?.Password).not.toEqual('test@T123');
	});

	test('Should return 400 and missing param error', async () => {
		const response = await request(server).post('/api/v1/user').send({
			name: 'test',
			password: 'test@T',
		});
		const user = await prisma.user.findUnique({
			where: {
				Email: 'test@test.com',
			},
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('Missing param: email');
		expect(user).toBeNull();
	});

	test('Should return 400 and invalid name error', async () => {
		const response = await request(server).post('/api/v1/user').send({
			name: 't',
			email: 'test@test.com',
			password: 'test@T123',
		});
		const user = await prisma.user.findUnique({
			where: {
				Email: 'test@test.com',
			},
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('The name t is invalid.');
		expect(user).toBeNull();
	});

	test('Should return 400 and user already created error', async () => {
		await prisma.user.create({
			data: {
				Name: 'test',
				Email: 'test@test.com',
				Password: 'test@T123',
			},
		});
		const response = await request(server).post('/api/v1/user').send({
			name: 'test',
			email: 'test@test.com',
			password: 'test@T123',
		});
		const user = await prisma.user.findMany({
			where: {
				Email: 'test@test.com',
			},
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual(
			'User with email test@test.com already created'
		);
		expect(user.length).toEqual(1);
	});
});
