import { RefreshJWT } from '@/core/use-case/refresh-jwt';
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
	constructor(private readonly refreshJwt: RefreshJWT) {}

	async handle(req: JwtRequest): Promise<HttpResponse> {
		try {
			const hasToken = validateRequest(['jwt'], req);

			if (hasToken.isLeft()) {
				return badRequest(hasToken.value);
			}

			const refreshToken = await this.refreshJwt.refresh(req.jwt);

			if (!refreshToken) {
				return unauthorizedRequest();
			}

			return ok({
				RefreshToken: refreshToken,
			});
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
