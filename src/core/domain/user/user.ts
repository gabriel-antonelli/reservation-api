import { left, right } from '@/shared/either';
import { Email } from './email';
import { Name } from './name';
import { Password } from './password';
import { UserData } from './userData';
import { UserType } from './userType';

export class User {
	private constructor(
		public readonly name: Name,
		public readonly email: Email,
		public readonly password: Password
	) {
		Object.freeze(this);
	}

	static create(user: UserData): UserType {
		const nameOrError = Name.create(user.name);
		const emailOrError = Email.create(user.email);
		const passwordOrError = Password.create(user.password);
		if (nameOrError.isLeft()) {
			return left(nameOrError.value);
		}
		if (emailOrError.isLeft()) {
			return left(emailOrError.value);
		}

		if (passwordOrError.isLeft()) {
			return left(passwordOrError.value);
		}

		const name: Name = nameOrError.value;
		const email: Email = emailOrError.value;
		const password: Password = passwordOrError.value;

		return right(new User(name, email, password));
	}
}
