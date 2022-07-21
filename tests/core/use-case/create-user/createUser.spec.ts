import { CreateUserImp } from '@/core/use-case/create-user';
import { UserRepository, Encryptor } from '@/core/use-case/ports';
import { mock } from 'jest-mock-extended';
import { UserAlreadyCreatedError } from '@/core/use-case/create-user/errors/userAlreadyCreatedError';
import { InvalidPasswordError } from '@/core/domain/user/errors';

describe('Create User', () => {
	const userRepositoryMock = mock<UserRepository>();
	const passwordEncryptorMock = mock<Encryptor>();
	const createUser = new CreateUserImp(
		userRepositoryMock,
		passwordEncryptorMock
	);

	test('Should create user', async () => {
		userRepositoryMock.exists.mockResolvedValue(false);
		passwordEncryptorMock.encrypt.mockResolvedValue('enctypted');
		const createUserResponse = await createUser.createUser({
			name: 'test',
			email: 'test@test.com',
			password: 'test1234@T',
		});
		expect(createUserResponse.value).toEqual(true);
	});

	test('Should throw user domain error(invalid password)', async () => {
		const createUserResponse = await createUser.createUser({
			name: 'test',
			email: 'test@test.com',
			password: 'test1234T',
		});
		expect(createUserResponse.value).toEqual(new InvalidPasswordError());
	});

	test('Should throw user already created error', async () => {
		userRepositoryMock.exists.mockResolvedValue(true);
		const alreadyCreatedEmail = 'test@test.com';
		const createUserResponse = await createUser.createUser({
			name: 'test',
			email: alreadyCreatedEmail,
			password: 'test1234@T',
		});
		expect(createUserResponse.value).toEqual(
			new UserAlreadyCreatedError(alreadyCreatedEmail)
		);
	});
});
