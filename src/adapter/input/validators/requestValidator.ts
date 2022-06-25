import { Either, left, right } from '@/shared/either';
import { MissingParamError } from '../errors/missingParamError';

export const validateRequest = (
	expectedParams: Array<string>,
	//eslint-disable-next-line
	receivedParams: any
): Either<MissingParamError, boolean> => {
	const missingParam = expectedParams.find(
		(expected) => !receivedParams[expected]
	);
	if (missingParam) {
		return left(new MissingParamError(missingParam));
	}
	return right(false);
};
