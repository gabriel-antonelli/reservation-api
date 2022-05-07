import { Logger } from '@/config';
import { ControllerError } from './controllerError';

export class ServerError extends Error implements ControllerError {
	constructor(exception: Error) {
		Logger.error(exception);
		super(`Server error: ${exception.message}`);
		this.name = 'ServerError';
		this.message = exception.message;
		this.stack = exception.stack;
	}
}
