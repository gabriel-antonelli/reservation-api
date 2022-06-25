import { User } from '@/core/domain';
import { UserData } from '@/core/domain/user/userData';
import { left, right } from '@/shared/either';
import { UserAlreadyCreatedError } from './errors/userAlreadyCreatedError';
import { UserRepository } from '../ports/userRepository';
import { CreateUser } from './createUser';
import { CreateUserResponse } from './createUserResponse';
import { PasswordEncryptor } from '../ports';

export class CreateUserImp implements CreateUser {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordEncryptor: PasswordEncryptor
	) {}

	async createUser(userData: UserData): Promise<CreateUserResponse> {
		const userOrError = User.create(userData);
		if (userOrError.isLeft()) {
			return left(userOrError.value);
		}
		const user: User = userOrError.value;
		const email = user.email.value;
		const exists = await this.userRepository.exists(email);
		if (exists.valueOf()) {
			return left(new UserAlreadyCreatedError(email));
		}
		const hashedPassword = await this.passwordEncryptor.encrypt(
			user.password.value
		);
		await this.userRepository.create({
			name: user.name.value,
			email: email,
			password: hashedPassword,
		});
		return right(true);
	}
}
