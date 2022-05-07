export const isEmailValid = (email: string): boolean => {
	const tester =
		/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
	if (!email) {
		return false;
	}
	if (email.length > 256) {
		return false;
	}
	if (!tester.test(email)) {
		return false;
	}
	const [account, address] = email.split('@');
	if (account.length > 64) {
		return false;
	}
	const domainParts = address.split('.');
	const isPartTooLong = domainParts.some((part) => part.length > 63);

	if (isPartTooLong) {
		return false;
	}
	return true;
};
