import { Router } from 'express';
import { routerAdapter } from '../adapters/routerAdapter';
import { makeEmailAuthController } from '../factories/emailAuthControllerFactory';

export default (router: Router): void => {
	router.post('/auth/email', routerAdapter(makeEmailAuthController()));
};
