import { EmailAuthController } from '@/adapter/input/controllers/auth/emailAuthController';
import { EmailAuthImp } from '@/core/use-case/email-auth';
import { JsonWebTokenAuth } from '@/external/auth/json-web-token/jsonWebTokenAuth';
import { PasswordEcryptorArgon } from '@/external/encryption/passwordEncryptorArgon';
import { UserRepositoryPrisma } from '@/external/repositories/postgres-prisma';

export const makeEmailAuthController = (): EmailAuthController => {
	const userRepository = new UserRepositoryPrisma();
	const encryptor = new PasswordEcryptorArgon();
	const jwtSigner = new JsonWebTokenAuth();
	const emailAuth = new EmailAuthImp(userRepository, encryptor, jwtSigner);

	return new EmailAuthController(emailAuth);
};
