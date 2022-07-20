import { ServerError } from '../errors/serverError';
import { HttpResponse } from '../ports';

//eslint-disable-next-line
export const ok = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data,
});

export const serverError = (exception: Error): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(exception).message,
});

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error.message,
});
