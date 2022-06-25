import { isPasswordValid } from '@/core/domain/user/validators/passwordValidator';

describe('Password validator', () => {
	test('Should accept valid password', () => {
		expect(isPasswordValid('@Aa1tttt')).toBeTruthy;
	});

	test('Should not accept password with less than 8 characters', () => {
		expect(isPasswordValid('@Aa1ttt')).toBeFalsy;
	});

	test('Should not accept password without at least 1 especial character', () => {
		expect(isPasswordValid('Aa1ttttt')).toBeFalsy;
	});

	test('Should no accept password without at least 1 uppercase letter', () => {
		expect(isPasswordValid('@aa1tttt')).toBeFalsy;
	});

	test('Should no accept password without at least 1 lowercase letter', () => {
		expect(isPasswordValid('@AA1AAAA')).toBeFalsy;
	});

	test('Should no accept password without at least 1 especial character', () => {
		expect(isPasswordValid('AAA1AAAA')).toBeFalsy;
	});
});
