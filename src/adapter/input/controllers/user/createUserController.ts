import { Controller, HttpResponse } from '@/adapter/input/ports';
import { UserData } from '@/core/domain/user/userData';
import { CreateUser } from '@/core/use-case/create-user';
import {
	badRequest,
	ok,
	serverError,
} from '@/adapter/input/helpers/httpHelper';
import { validateRequest } from '@/adapter/input/validators/requestValidator';

export class CreateUserController implements Controller {
	constructor(private readonly createUser: CreateUser) {}

	async handle(req: UserData): Promise<HttpResponse> {
		try {
			const isRequestValid = validateRequest(
				['name', 'email', 'password'],
				req
			);
			if (isRequestValid.isLeft()) {
				return badRequest(isRequestValid.value);
			}
			const createUserResponse = await this.createUser.createUser(req);
			if (createUserResponse.isLeft()) {
				return badRequest(createUserResponse.value);
			}
			return ok(`Created user ${req.name}`);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
