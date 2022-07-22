import { Router } from 'express';
import { routerAdapter } from '../adapters/routerAdapter';
import {
	makeCreateUserController,
	makeVerifyUserEmailController,
} from '../factories';

export default (router: Router): void => {
	router.post('/user', routerAdapter(makeCreateUserController()));
	router.get(
		'/user/verify/:token',
		routerAdapter(makeVerifyUserEmailController())
	);
};
