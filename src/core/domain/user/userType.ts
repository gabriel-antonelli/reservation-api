import { Either } from '@/shared/either';
import { User } from '..';
import { InvalidEmailError } from './errors/invalidEmail';
import { InvalidNameError } from './errors/invalidName';
import { InvalidPasswordError } from './errors/invalidPassword';

export type UserType = Either<
	InvalidNameError | InvalidEmailError | InvalidPasswordError,
	User
>;
