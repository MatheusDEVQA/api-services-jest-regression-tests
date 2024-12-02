// jest.config.ts
import type { Config } from '@jest/types';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const config: Config.InitialOptions = {
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
