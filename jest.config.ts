import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	roots: ['<rootDir>/tests', 'src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: {
		'@/tests/(.*)': '<rootDir>/tests/$1',
		'@/(.*)': '<rootDir>/src/$1',
	},
	setupFiles: ['dotenv/config'],
};

export default config;
