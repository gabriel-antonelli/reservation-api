import { Either, left, right } from '@/shared/either';
import { InvalidNameError } from './errors/invalidName';
import { isNameValid } from './validators/nameValidator';

export class Name {
	constructor(private readonly name: string) {
		Object.freeze(this);
	}

	static create(name: string): Either<InvalidNameError, Name> {
		if (!isNameValid(name)) {
			return left(new InvalidNameError(name));
		}
		return right(new Name(name));
	}

	get value(): string {
		return this.name;
	}
}
