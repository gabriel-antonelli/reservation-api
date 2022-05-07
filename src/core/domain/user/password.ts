import { Either, left, right } from '@/shared/either';
import { InvalidPasswordError } from './errors/invalidPassword';
import { isPasswordValid } from './validators/passwordValidator';

export class Password {
	private readonly password: string;

	constructor(password: string) {
		this.password = password;
		Object.freeze(this);
	}
	static create(password: string): Either<InvalidPasswordError, Password> {
		if (!isPasswordValid(password)) {
			return left(new InvalidPasswordError());
		}
		return right(new Password(password));
	}

	get value(): string {
		return this.password;
	}
}
