import { UserData } from '@/core/domain/user/userData';
import { CreateUserResponse } from '@/core/use-case/create-user/createUserResponse';

export interface CreateUser {
	createUser: (user: UserData) => Promise<CreateUserResponse>;
}
