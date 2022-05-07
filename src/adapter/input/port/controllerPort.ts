import { HttpResponse } from '.';

export interface Controller {
	// eslint-disable-next-line
	handle: (req: any) => Promise<HttpResponse>;
}
