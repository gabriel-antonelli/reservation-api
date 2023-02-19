import { VerifyUserEmailController } from '@/adapter/input/controllers/user/verifyUserEmailController';
import { VerifyUserEmailImp } from '@/core/use-case/verify-user-email/verifyUserEmailImp';
import { UserRepositoryPrisma } from '@/external/repositories/postgres-prisma';

export const makeVerifyUserEmailController = (): VerifyUserEmailController => {
	const userRepository = new UserRepositoryPrisma();
	const verifyUserEmail = new VerifyUserEmailImp(userRepository);
	return new VerifyUserEmailController(verifyUserEmail);
};
