import { mock } from 'jest-mock-extended';
import { EmailAuthImp } from '@/core/use-case/email-auth';
import { Encryptor, UserRepository } from '@/core/use-case/ports';
import { AuthResponseGenerator } from '@/core/use-case/auth-response-generator';

describe('Email Auth', () => {
	const authResponse = {
		token: 'testToken',
		refreshToken: 'refreshToken',
	};
	const userRepository = mock<UserRepository>();
	const encryptor = mock<Encryptor>();
	const authResponseGenerator = mock<AuthResponseGenerator>();
	const emailAuth = new EmailAuthImp(
		userRepository,
		encryptor,
		authResponseGenerator
	);

	test('Should authenticate user', async () => {
		userRepository.findPasswordByEmail.mockResolvedValue('test');
		encryptor.verify.mockResolvedValue(true);
		authResponseGenerator.generateAuthResponse.mockResolvedValue(authResponse);

		const emailAuthResponse = await emailAuth.auth('test@test.com', 'test');

		expect(emailAuthResponse.value).toMatchObject(authResponse);
	});

	test('Should return false(hashedPassword not found)', async () => {
		userRepository.findPasswordByEmail.mockResolvedValue(null);

		const emailAuthResponse = await emailAuth.auth('test@test.com', 'test');

		expect(emailAuthResponse.value).toEqual(false);
	});

	test('Should return false(invalid password)', async () => {
		userRepository.findPasswordByEmail.mockResolvedValue('test');
		encryptor.verify.mockResolvedValue(false);

		const emailAuthResponse = await emailAuth.auth('test@test.com', 'test');

		expect(emailAuthResponse.value).toEqual(false);
	});

	test('Should return false(no token returned)', async () => {
		userRepository.findPasswordByEmail.mockResolvedValue('test');
		encryptor.verify.mockResolvedValue(true);
		authResponseGenerator.generateAuthResponse.mockResolvedValue(false);

		const emailAuthResponse = await emailAuth.auth('test@test.com', 'test');

		expect(emailAuthResponse.value).toEqual(false);
	});
});
