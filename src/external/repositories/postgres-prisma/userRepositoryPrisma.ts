import { UserData } from '@/core/domain/user/userData';
import { UserRepository } from '@/core/use-case/ports';
import { prisma } from './config/prismaClient';

export class UserRepositoryPrisma implements UserRepository {
	async create(userData: UserData): Promise<void> {
		await prisma.user.create({
			data: {
				Name: userData.name,
				Email: userData.email,
				Password: userData.password,
			},
		});
	}

	async exists(email: string): Promise<boolean> {
		const unique = await prisma.user.findUnique({
			where: {
				Email: email,
			},
		});
		if (unique) {
			return true;
		}
		return false;
	}
}
