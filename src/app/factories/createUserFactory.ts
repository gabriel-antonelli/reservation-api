import { CreateUserController } from '@/adapter/input/controllers/user/createUserController';
import { CreateUserImp } from '@/core/use-case/create-user';
import { PasswordEcryptorArgon } from '@/external/encryption/passwordEncryptorArgon';
import { UserRepositoryPrisma } from '@/external/repositories/postgres-prisma';

export const makeCreateUserController = (): CreateUserController => {
	const createUserRepository = new UserRepositoryPrisma();
	const passwordEncryptor = new PasswordEcryptorArgon();
	const createUser = new CreateUserImp(createUserRepository, passwordEncryptor);
	return new CreateUserController(createUser);
};
