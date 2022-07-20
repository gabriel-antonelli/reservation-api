import { Router } from 'express';
import { routerAdapter } from '../adapters/routerAdapter';
import { makeCreateUserController } from '../factories/createUserFactory';

export default (router: Router): void => {
	router.post('/user', routerAdapter(makeCreateUserController()));
};
