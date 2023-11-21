/** @type {import('ts-jest').JestConfigWithTsJest} */
export {};
module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['./jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/index.tsx',
    '!<rootDir>/src/**/index.ts',
  ],
  coveragePathIgnorePatterns: ['./src/**/*.tsx', './src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  snapshotSerializers: ['jest-serializer-html'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};

// --------

// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   moduleDirectories: ['node_modules', 'src'],
//   setupFiles: ['./jest.setup.ts'],
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx,ts,tsx}',
//     '!**/node_modules/**',
//     '!**/index.tsx',
//     '!**/index.ts',
//     '!**/*.i18n.*',
//     '!**/i18n.*',
//   ],
//   coveragePathIgnorePatterns: [
//     '/node_modules/',
//     '/src/index.tsx',
//     '/src/index.ts',
//   ],
//   coverageDirectory: 'coverage',
//   coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
//   snapshotSerializers: ['jest-serializer-html'],
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   testMatch: ['**/*.(test|spec).(ts|tsx)'],
//   coverageThreshold: {
//     global: {
//       branches: 70,
//       functions: 70,
//       lines: 70,
//       statements: 70,
//     },
//   },
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

// export default config;
