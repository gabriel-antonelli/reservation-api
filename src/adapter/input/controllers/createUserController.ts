import { Controller, HttpResponse } from '@/adapter/input/port';
import { UserData } from '@/core/domain/user/userData';
import { CreateUser } from '@/core/use-case/create-user';
import {
	badRequest,
	ok,
	serverError,
} from '@/adapter/input/helpers/httpHelper';
import { validateRequest } from '../validators/requestValidator';

export class CreateUserController implements Controller {
	private readonly createUser: CreateUser;

	constructor(createUser: CreateUser) {
		this.createUser = createUser;
	}

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
