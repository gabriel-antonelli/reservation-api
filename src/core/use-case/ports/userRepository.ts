import { UserData } from '@/core/domain/user/userData';

export interface UserRepository {
	exists: (email: string) => Promise<boolean>;
	create: (userData: UserData) => Promise<void>;
	findTokenExpireDate: (token: string) => Promise<Date | null | undefined>;
	verifyUser: (token: string) => Promise<void>;
}
