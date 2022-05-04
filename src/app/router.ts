import { Router } from 'express';
import { CreateUser } from '@/adapter/input/controllers/createUser';
import { routerAdapter } from './adapters/routerAdapter';

const router = Router();
router.post('/user/create', routerAdapter(new CreateUser()));
export default router;
