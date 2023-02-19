import { CreateUserController } from '@/adapter/input/controllers/user/createUserController';
import { CreateUserImp } from '@/core/use-case/create-user';
import { VerificationSender } from '@/external/email/sendgrid/verificationSender';
import { PasswordEcryptorArgon } from '@/external/encryption/passwordEncryptorArgon';
import { NanoIdStringGenerator } from '@/external/random-string-generator/nano-id';
import { UserRepositoryPrisma } from '@/external/repositories/postgres-prisma';

export const makeCreateUserController = (): CreateUserController => {
	const createUserRepository = new UserRepositoryPrisma();
	const passwordEncryptor = new PasswordEcryptorArgon();
	const mailSender = new VerificationSender();
	const randomStringGenerator = new NanoIdStringGenerator();
	const createUser = new CreateUserImp(
		createUserRepository,
		passwordEncryptor,
		mailSender,
		randomStringGenerator
	);
	return new CreateUserController(createUser);
};
