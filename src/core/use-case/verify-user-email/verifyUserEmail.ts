import { VerifyUserEmailResponse } from './verifyUserEmailResponse';

export interface VerifyUserEmail {
	verify: (token: string) => Promise<VerifyUserEmailResponse>;
}
