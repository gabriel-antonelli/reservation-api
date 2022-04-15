import { HttpRequest, HttpResponse } from '../port/http-port';

export interface Controller {
	get?: (req: HttpRequest) => Promise<HttpResponse>;
	post?: (req: HttpRequest) => Promise<HttpResponse>;
}
