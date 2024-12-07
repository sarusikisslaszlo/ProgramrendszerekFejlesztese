import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  verbose: true,
};

export default config;