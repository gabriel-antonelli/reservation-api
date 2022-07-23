import { mock } from 'jest-mock-extended';
import { UserRepository } from '@/core/use-case/ports';
import { VerifyUserEmailImp } from '@/core/use-case/verify-user-email';
import {
	ExpiredTokenError,
	InvalidTokenError,
} from '@/core/use-case/verify-user-email/errors';

describe('Verify User Email', () => {
	const userRepositoy = mock<UserRepository>();
	const verifyUserEmail = new VerifyUserEmailImp(userRepositoy);

	test('Should verify user', async () => {
		userRepositoy.findTokenExpireDate.mockResolvedValue(new Date(3020, 12, 25));
		const verifyUserEmailResponse = await verifyUserEmail.verify('test');

		expect(verifyUserEmailResponse.value).toEqual(true);
	});

	test('Should throw expired token error', async () => {
		userRepositoy.findTokenExpireDate.mockResolvedValue(null);
		const verifyUserEmailResponse = await verifyUserEmail.verify('test');

		expect(verifyUserEmailResponse.value).toEqual(new InvalidTokenError());
	});

	test('Should throw expired token error', async () => {
		userRepositoy.findTokenExpireDate.mockResolvedValue(new Date(2001, 12, 25));
		const verifyUserEmailResponse = await verifyUserEmail.verify('test');

		expect(verifyUserEmailResponse.value).toEqual(new ExpiredTokenError());
	});
});
