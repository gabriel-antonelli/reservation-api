import { DecodedJWT } from '@/core/use-case/ports';
import { JsonWebTokenAuth } from '@/external/auth/json-web-token/jsonWebTokenAuth';
import { Request, Response, NextFunction } from 'express';
import { ServerError } from '@/adapter/input/errors';

export default async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		const jwt = new JsonWebTokenAuth();
		const jwtVerified = await jwt.verify(req.get('X-AUTH') as string);

		if (jwtVerified) {
			const email = (jwtVerified as DecodedJWT).email;
			req.body = { ...(req.body || {}), authUserEmail: email };
			return next();
		}

		return res.status(401).json('Unauthorized request');
	} catch (error) {
		return res.status(500).json(new ServerError(error as Error).message);
	}
};
