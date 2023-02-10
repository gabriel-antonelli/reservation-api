import { Request, Response } from 'express';
import { Controller } from '@/adapter/input/ports';

export const routerAdapter = (controller: Controller) => {
	return async (req: Request, res: Response): Promise<Response> => {
		const httpRequest = {
			...(req.body || {}),
			...(req.params || {}),
		};
		const httpResponse = await controller.handle(httpRequest);
		return res.status(httpResponse.statusCode).json(httpResponse.body);
	};
};
