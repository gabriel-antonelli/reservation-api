import { UserData } from '@/core/domain/user/userData';
import { UserRepository } from '@/core/use-case/ports';
import { prisma } from './config/prismaClient';

export class UserRepositoryPrisma implements UserRepository {
	async create(userData: UserData): Promise<void> {
		await prisma.user.create({
			data: {
				name: userData.name,
				email: userData.email,
				password: userData.password,
			},
		});
	}

	async exists(email: string): Promise<boolean> {
		const unique = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (unique) {
			return true;
		}
		return false;
	}
}
