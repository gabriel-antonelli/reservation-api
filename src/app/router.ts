import { Router } from 'express';
import { routerAdapter } from './adapters/routerAdapter';
import { makeCreateUserController } from './factories/createUserFactory';

const router = Router();
router.post('/user/create', routerAdapter(makeCreateUserController()));
export default router;
