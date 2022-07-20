import { User } from '@/core/domain';
import { UserType } from '@/core/domain/user/userType';
import {
	InvalidNameError,
	InvalidEmailError,
	InvalidPasswordError,
} from '@/core/domain/user/errors';

describe('User', () => {
	test('Should create user with valid params', () => {
		const userOrError: UserType = User.create({
			name: 'test',
			email: 'test@test.com',
			password: 'test@Test1',
		});
		expect(userOrError.value).toEqual({
			email: { email: 'test@test.com' },
			name: { name: 'test' },
			password: { password: 'test@Test1' },
		});
	});

	test('Should return invalid name error', () => {
		const invalidName = 't';
		const userOrError: UserType = User.create({
			name: invalidName,
			email: 'test@test.com',
			password: 'test@Test1',
		});
		expect(userOrError.value).toEqual(new InvalidNameError(invalidName));
	});

	test('Should return invalid email error', () => {
		const invalidEmail = 'testtest.com';
		const userOrError: UserType = User.create({
			name: invalidEmail,
			email: 'testtest.com',
			password: 'test@Test1',
		});
		expect(userOrError.value).toEqual(new InvalidEmailError(invalidEmail));
	});

	test('Should return invalid password error', () => {
		const userOrError: UserType = User.create({
			name: 'test',
			email: 'test@test.com',
			password: 'test1234!',
		});
		expect(userOrError.value).toEqual(new InvalidPasswordError());
	});
});
