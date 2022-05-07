import { InvalidEmailError } from '@/core/domain/user/errors/invalidEmail';
import { InvalidNameError } from '@/core/domain/user/errors/invalidName';
import { InvalidPasswordError } from '@/core/domain/user/errors/invalidPassword';
import { Either } from '@/shared/either';
import { UserAlreadyCreatedError } from './errors/userAlreadyCreatedError';

export type CreateUserResponse = Either<
	| InvalidNameError
	| InvalidEmailError
	| InvalidPasswordError
	| UserAlreadyCreatedError,
	boolean
>;
