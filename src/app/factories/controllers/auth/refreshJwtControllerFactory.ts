import { RefreshJwtController } from '@/adapter/input/controllers/auth/refreshJwtController';
import { RefreshJwtImp } from '@/core/use-case/refresh-jwt';
import { JsonWebTokenAuth } from '@/external/auth/json-web-token/jsonWebTokenAuth';

export const makeRefreshJwtController = (): RefreshJwtController => {
	const jwt = new JsonWebTokenAuth();
	const refreshJwt = new RefreshJwtImp(jwt);
	return new RefreshJwtController(refreshJwt);
};
