import { RefreshJwtController } from '@/adapter/input/controllers/auth/refreshJwtController';
import { makeAuthResponseGenerator } from '../../use-case';

export const makeRefreshJwtController = (): RefreshJwtController => {
	return new RefreshJwtController(makeAuthResponseGenerator());
};
