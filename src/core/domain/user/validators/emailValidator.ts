export const isEmailValid = (email: string): boolean => {
	const tester =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!email || email.length > 255 || !tester.test(email)) {
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
