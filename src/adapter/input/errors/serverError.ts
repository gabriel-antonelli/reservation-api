import { Logger } from '@/config';
import { ControllerError } from './controllerError';

export class ServerError extends Error implements ControllerError {
	constructor(exception: Error) {
		Logger.error(exception);
		super(`Internal Server Error`);
		this.name = 'ServerError';
	}
}
