import { Either } from '@/shared/either';
import { ExpiredTokenError, InvalidTokenError } from './errors';

export type VerifyUserEmailResponse = Either<
	InvalidTokenError | ExpiredTokenError,
	boolean
>;
