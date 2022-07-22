import { VerifyUserEmail } from '@/core/use-case/verify-user-email';
import { mock } from 'jest-mock-extended';
import { VerifyUserEmailController } from '@/adapter/input/controllers/user/verifyUserEmailController';
import { left, right } from '@/shared/either';
import { ExpiredTokenError } from '@/core/use-case/verify-user-email/errors';

describe('Verify User Controller', () => {
	const verifyUserEmail = mock<VerifyUserEmail>();
	const verifyUserEmailController = new VerifyUserEmailController(
		verifyUserEmail
	);

	test('Should return 200 status and message', async () => {
		verifyUserEmail.verify.mockResolvedValue(right(true));
		const response = await verifyUserEmailController.handle({
			token: 'test',
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual('User is verified');
	});

	test('Should return 400 status and expired token error message', async () => {
		verifyUserEmail.verify.mockResolvedValue(left(new ExpiredTokenError()));
		const response = await verifyUserEmailController.handle({
			token: 'test',
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('The token has expired');
	});

	test('Should return 500 status and internal server error message', async () => {
		verifyUserEmail.verify.mockRejectedValue(new Error('test exception'));
		const response = await verifyUserEmailController.handle({
			token: 'test',
		});

		expect(response.statusCode).toEqual(500);
		expect(response.body).toEqual('Internal Server Error');
	});
});
