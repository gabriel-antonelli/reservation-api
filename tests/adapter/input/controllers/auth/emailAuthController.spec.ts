import { EmailAuth } from '@/core/use-case/email-auth';
import { mock } from 'jest-mock-extended';
import { EmailAuthController } from '@/adapter/input/controllers/auth/emailAuthController';
import { left, right } from '@/shared/either';
import { EmailAuthRequest } from '@/adapter/input/controllers/auth/data/emailAuthRequest';

describe('Email Auth Controller', () => {
	const emailAuth = mock<EmailAuth>();
	const emailAuthController = new EmailAuthController(emailAuth);

	test('Should return 200 and token', async () => {
		emailAuth.auth.mockResolvedValue(right('testToken'));
		const response = await emailAuthController.handle({
			email: 'test@test.com',
			password: 'test',
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			Authorized: true,
			Token: 'testToken',
		});
	});

	test('Should return 400 and missing param error message', async () => {
		const response = await emailAuthController.handle({
			password: 'test',
		} as EmailAuthRequest);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('Missing param: email');
	});

	test('Should return 401 and unauthorized request error message', async () => {
		emailAuth.auth.mockResolvedValue(left(false));
		const response = await emailAuthController.handle({
			email: 'test@test.com',
			password: 'test',
		});

		expect(response.statusCode).toEqual(401);
		expect(response.body).toEqual('Unauthorized Request');
	});

	test('Should return 500 and internal server error message', async () => {
		emailAuth.auth.mockRejectedValue(new Error('test exception'));
		const response = await emailAuthController.handle({
			email: 'test@test.com',
			password: 'test',
		});

		expect(response.statusCode).toEqual(500);
		expect(response.body).toEqual('Internal Server Error');
	});
});
