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
				Token: userData.token,
				TokenExpireDate: userData.tokenExpireDate,
			},
		});
	}

	async exists(email: string): Promise<boolean> {
		const unique = await prisma.user.findUnique({
			where: {
				Email: email,
			},
		});
		return !!unique;
	}

	async findTokenExpireDate(token: string): Promise<Date | null | undefined> {
		const findToken = await prisma.user.findFirst({
			where: {
				Token: token,
			},
			select: {
				TokenExpireDate: true,
			},
		});
		return findToken?.TokenExpireDate;
	}

	async verifyUser(token: string): Promise<void> {
		await prisma.user.update({
			where: {
				Token: token,
			},
			data: {
				IsVerified: true,
			},
		});
	}

	async findPasswordByEmail(email: string): Promise<string | null | undefined> {
		const findPassword = await prisma.user.findFirst({
			where: {
				Email: email,
				IsVerified: true,
			},
			select: {
				Password: true,
			},
		});
		return findPassword?.Password;
	}
}
