import { Controller, HttpResponse } from '../../ports';
import {
	badRequest,
	serverError,
	ok,
} from '@/adapter/input/helpers/httpHelper';
import { VerifyUserEmail } from '@/core/use-case/verify-user-email';
import { TokenRequest } from './data/tokenRequest';

export class VerifyUserEmailController implements Controller {
	constructor(private verifyUserEmail: VerifyUserEmail) {}

	async handle(req: TokenRequest): Promise<HttpResponse> {
		try {
			const isUserValid = await this.verifyUserEmail.verify(req.token);

			if (isUserValid.isLeft()) {
				return badRequest(isUserValid.value);
			}
			return ok('User is verified');
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
