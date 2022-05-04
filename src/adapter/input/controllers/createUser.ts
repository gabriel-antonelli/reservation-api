import { Controller, HttpResponse } from '@/adapter/input/port';
import { CreateUserRequest } from '@/adapter/input/request-data';

export class CreateUser implements Controller {
	async handle(req: CreateUserRequest): Promise<HttpResponse> {
		return {
			statusCode: 200,
			body: { message: `User ${req.name} created sucessfull` },
		};
	}
}
