import { HttpRequest, HttpResponse } from '.';

export interface Controller {
	handle: (req: HttpRequest) => Promise<HttpResponse>;
}
