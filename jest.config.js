module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
          moduleResolution: 'node10',
          target: 'es2022',
          strict: true,
          esModuleInterop: true,
          types: ['node', 'jest'],
        },
      },
    ],
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
};
