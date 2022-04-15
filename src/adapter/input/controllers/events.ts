import { HttpResponse, HttpRequest } from '../port/http-port';
import { Controller } from '../port/controller-port';

export class Event implements Controller {
	async get(_: HttpRequest): Promise<HttpResponse> {
		return {
			statusCode: 200,
			body: { message: 'hello' },
		};
	}
}
