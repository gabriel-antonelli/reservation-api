import { mock } from 'jest-mock-extended';
import { EmailAuthImp } from '@/core/use-case/email-auth';
import { Encryptor, UserRepository, JWT } from '@/core/use-case/ports';

describe('Email Auth', () => {
	const userRepository = mock<UserRepository>();
	const encryptor = mock<Encryptor>();
	const jwt = mock<JWT>();
	const emailAuth = new EmailAuthImp(userRepository, encryptor, jwt);

	test('Should authenticate user', async () => {
		userRepository.findPasswordByEmail.mockResolvedValue('test');
		encryptor.verify.mockResolvedValue(true);
		jwt.sign.mockResolvedValue('tokenTest');

		const emailAuthResponse = await emailAuth.auth('test@test.com', 'test');

		expect(emailAuthResponse.value).toEqual('tokenTest');
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
});
