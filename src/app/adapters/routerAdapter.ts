import { Request, Response } from 'express';
import { Controller } from '../../adapter/input/port/controller-port';
import { HttpRequest, HttpResponse } from '../../adapter/input/port/http-port';

export const routerAdapter = (controller: Controller) => {
	return async (req: Request, res: Response): Promise<Response> => {
		const httpRequest: HttpRequest = {
			body: req.body,
		};
		let httpResponse: HttpResponse;

		switch (req.method) {
			case 'GET':
				httpResponse = (await controller.get?.(httpRequest)) as HttpResponse;
				break;
			default:
				httpResponse = {
					statusCode: 500,
					body: 'Unknown Internal Server Error',
				};
		}
		return res.status(httpResponse.statusCode).json(httpResponse.body);
	};
};
