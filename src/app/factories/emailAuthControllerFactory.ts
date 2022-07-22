import { EmailAuthController } from '@/adapter/input/controllers/auth/emailAuthController';
import { EmailAuthImp } from '@/core/use-case/email-auth';
import { JsonWebTokenSigner } from '@/external/auth/json-web-token/jsonWebTokenSigner';
import { PasswordEcryptorArgon } from '@/external/encryption/passwordEncryptorArgon';
import { UserRepositoryPrisma } from '@/external/repositories/postgres-prisma';

export const makeEmailAuthController = (): EmailAuthController => {
	const userRepository = new UserRepositoryPrisma();
	const encryptor = new PasswordEcryptorArgon();
	const jwtSigner = new JsonWebTokenSigner();
	const emailAuth = new EmailAuthImp(userRepository, encryptor, jwtSigner);

	return new EmailAuthController(emailAuth);
};
