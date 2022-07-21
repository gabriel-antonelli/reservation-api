export interface UserData {
	name: string;
	email: string;
	password: string;
	token?: string;
	tokenExpireDate?: Date;
}
