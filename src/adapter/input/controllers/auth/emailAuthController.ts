import { EmailAuth } from '@/core/use-case/email-auth';
import {
	badRequest,
	ok,
	serverError,
	unauthorizedRequest,
} from '../../helpers/httpHelper';
import { Controller, HttpResponse } from '../../ports';
import { validateRequest } from '../../validators/requestValidator';
import { EmailAuthRequest } from './data/emailAuthRequest';

export class EmailAuthController implements Controller {
	constructor(private readonly emailAuth: EmailAuth) {}

	async handle(req: EmailAuthRequest): Promise<HttpResponse> {
		try {
			const isRequestValid = validateRequest(['email', 'password'], req);
			if (isRequestValid.isLeft()) {
				return badRequest(isRequestValid.value);
			}

			const isUserAuthorized = await this.emailAuth.auth(
				req.email,
				req.password
			);

			if (isUserAuthorized.isLeft()) {
				return unauthorizedRequest();
			}

			return ok({
				Authorized: true,
				Token: isUserAuthorized.value,
			});
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
