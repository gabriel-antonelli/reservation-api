import { Either, left, right } from '@/shared/either';
import { InvalidEmailError } from './errors/invalidEmail';
import { isEmailValid } from './validators/emailValidator';

export class Email {
	constructor(private readonly email: string) {
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
