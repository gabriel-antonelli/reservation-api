export const isPasswordValid = (password: string): boolean => {
	const passwordRegex = new RegExp(
		'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
	);
	if (!password || !passwordRegex.test(password)) {
		return false;
	}
	return true;
};
