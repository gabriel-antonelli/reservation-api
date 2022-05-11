import { isNameValid } from '@/core/domain/user/validators/nameValidator';

describe('Name validator', () => {
	test('Should accept valid name', () => {
		expect(isNameValid('teste teste')).toBeTruthy();
	});

	test('Should not accept name with less than 2 characters', () => {
		expect(isNameValid('t')).toBeFalsy();
	});

	test('Should not accept name with more than 255 characters', () => {
		const longName = 't'.repeat(256);
		expect(isNameValid(longName)).toBeFalsy();
	});
});
