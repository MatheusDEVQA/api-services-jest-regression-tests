// jest.config.ts
import type { Config } from '@jest/types';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '@jsonObjects/(.*)': '<rootDir>/src/jsonObjects/$1',
    '@requests/(.*)': '<rootDir>/src/requests/$1',
    '@tests/(.*)': '<rootDir>/src/tests/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
  testTimeout: 60000,
  cache: false,
  verbose: true,
  reporters: [
    ['jest-junit', { outputDirectory: 'reports', outputName: 'report.xml' }],
    'default',
    ['jest-ctrf-json-reporter', { outputDir: 'reports', outputFile: 'report.json' }],
  ],
};

export default config;
