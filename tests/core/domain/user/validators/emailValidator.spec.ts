import { isEmailValid } from '@/core/domain/user/validators/emailValidator';

describe('Email validator', () => {
	test('Should accept valid email', () => {
		expect(isEmailValid('teste_test.test@teste.com.test')).toBeTruthy();
	});

	test('Should not accept email without @', () => {
		expect(isEmailValid('test.com')).toBeFalsy();
	});

	test('Should not accept email with spaces', () => {
		expect(isEmailValid('test @test.com')).toBeFalsy();
	});

	test('Should not accept a dot as last char at local part', () => {
		expect(isEmailValid('teste.@teste.com')).toBeFalsy();
	});

	test('Should not accept a dot as first char at domain part', () => {
		expect(isEmailValid('test@.test.com')).toBeFalsy();
	});

	test('Should not accept email with more than 255 characters', () => {
		const longString = 't'.repeat(256);
		const longEmail = `${longString}@test.com`;

		expect(isEmailValid(longEmail)).toBeFalsy();
	});

	test('Should not accept local part with more than 64 characters', () => {
		const longString = 't'.repeat(65);
		const longLocalEmail = `${longString}@test.com`;

		expect(isEmailValid(longLocalEmail)).toBeFalsy();
	});

	test('Should not accept domain part with more than 63 characters', () => {
		const longString = 't'.repeat(64);
		const longDomainEmail = `test@${longString}.com`;
		const longTldEmail = `test@test.${longString}`;

		expect(isEmailValid(longDomainEmail)).toBeFalsy();
		expect(isEmailValid(longTldEmail)).toBeFalsy();
	});
});
