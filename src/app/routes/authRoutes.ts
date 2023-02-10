import { Router } from 'express';
import { routerAdapter } from '../adapters/routerAdapter';
import {
	makeEmailAuthController,
	makeRefreshJwtController,
} from '../factories/';
import routeAuthMiddleware from '../middlewares/routeAuthMiddleware';

export default (router: Router): void => {
	router.post('/auth/email', routerAdapter(makeEmailAuthController()));
	router.get(
		'/auth/refresh-token',
		routeAuthMiddleware,
		routerAdapter(makeRefreshJwtController())
	);
};
