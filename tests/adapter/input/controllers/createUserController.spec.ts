import { CreateUser } from '@/core/use-case/create-user';
import { mock } from 'jest-mock-extended';
import { CreateUserController } from '@/adapter/input/controllers/createUserController';
import { left, right } from '@/shared/either';
import { UserData } from '@/core/domain/user/userData';
import { InvalidEmailError } from '@/core/domain/user/errors';

describe('Create User Controller', () => {
	const createUser = mock<CreateUser>();
	const createUserController = new CreateUserController(createUser);

	test('Should return 200 status and message', async () => {
		createUser.createUser.mockResolvedValue(right(true));
		const response = await createUserController.handle({
			name: 'test',
			email: 'test@test.com',
			password: 'test123@T',
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual('Created user test');
	});

	test('Should return 400 and missing param error', async () => {
		createUser.createUser.mockResolvedValue(right(true));
		const partialUserData: Partial<UserData> = {
			name: 'test',
			password: 'test',
		};

		const response = await createUserController.handle(
			partialUserData as UserData
		);

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual('Missing param: email');
	});

	test('Should return 400 and invalid email message', async () => {
		const invalidEmail = 'test@t';

		createUser.createUser.mockResolvedValue(
			left(new InvalidEmailError(invalidEmail))
		);

		const response = await createUserController.handle({
			name: 'test',
			email: invalidEmail,
			password: 'test',
		});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toEqual(`The email ${invalidEmail} is invalid.`);
	});

	test('Should return 500 status and internal server error message', async () => {
		createUser.createUser.mockRejectedValue(new Error('test'));
		const response = await createUserController.handle({
			name: 'test',
			email: 'test@test.com',
			password: 'test123@T',
		});

		expect(response.statusCode).toEqual(500);
		expect(response.body).toEqual('Internal Server Error');
	});
});
