import { EmailAuthController } from '@/adapter/input/controllers/auth/emailAuthController';
import { EmailAuthImp } from '@/core/use-case/email-auth';
import { PasswordEcryptorArgon } from '@/external/encryption/passwordEncryptorArgon';
import { UserRepositoryPrisma } from '@/external/repositories/postgres-prisma';
import { makeAuthResponseGenerator } from '../../use-case';

export const makeEmailAuthController = (): EmailAuthController => {
	const userRepository = new UserRepositoryPrisma();
	const encryptor = new PasswordEcryptorArgon();
	const emailAuth = new EmailAuthImp(
		userRepository,
		encryptor,
		makeAuthResponseGenerator()
	);

	return new EmailAuthController(emailAuth);
};
