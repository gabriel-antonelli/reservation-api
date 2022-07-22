import { Either } from '@/shared/either';

export interface EmailAuth {
	auth: (email: string, password: string) => Promise<Either<false, string>>;
}
