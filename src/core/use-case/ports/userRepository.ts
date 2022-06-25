import { UserData } from '@/core/domain/user/userData';

export interface UserRepository {
	exists: (email: string) => Promise<boolean>;
	create: (userData: UserData) => Promise<void>;
}
