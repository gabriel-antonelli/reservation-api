import { Router } from 'express';
import { Event } from '../adapter/input/controllers/events';
import { routerAdapter } from './adapters/routerAdapter';

const router = Router();
router.get('/', routerAdapter(new Event()));
export default router;
