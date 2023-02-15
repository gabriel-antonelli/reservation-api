import { AuthResponseGenerator } from '@/core/use-case/auth-response-generator/authResponseGenerator';
import {
	ok,
	badRequest,
	unauthorizedRequest,
	serverError,
} from '../../helpers/httpHelper';
import { Controller, HttpResponse } from '../../ports';
import { validateRequest } from '../../validators/requestValidator';
import { JwtRequest } from './data/JwtRequest';

export class RefreshJwtController implements Controller {
	constructor(private readonly authResponseGenerator: AuthResponseGenerator) {}

	async handle(req: JwtRequest): Promise<HttpResponse> {
		try {
			const hasToken = validateRequest(['authUserEmail'], req);

			if (hasToken.isLeft()) {
				return badRequest(hasToken.value);
			}
			const authResponse =
				await this.authResponseGenerator.generateAuthResponse(
					req.authUserEmail
				);

			if (!authResponse) {
				return unauthorizedRequest();
			}

			return ok(authResponse);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
