import { Router } from 'express';
import { routerAdapter } from '../adapters/routerAdapter';
import {
	makeEmailAuthController,
	makeRefreshJwtController,
} from '../factories/';

export default (router: Router): void => {
	router.post('/auth/email', routerAdapter(makeEmailAuthController()));
	router.get('/auth/refresh-token', routerAdapter(makeRefreshJwtController()));
};
