import { Either, left, right } from '@/shared/either';
import { InvalidEmailError } from './errors/invalidEmail';
import { isEmailValid } from './validators/emailValidator';

export class Email {
	private readonly email: string;

	constructor(email: string) {
		this.email = email;
		Object.freeze(this);
	}
	static create(email: string): Either<InvalidEmailError, Email> {
		if (!isEmailValid(email)) {
			return left(new InvalidEmailError(email));
		}
		return right(new Email(email));
	}

	get value(): string {
		return this.email;
	}
}
