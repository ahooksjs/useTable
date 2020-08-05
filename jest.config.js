module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  modulePathIgnorePatterns: ['template'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '@ahooksjs/(.*)': '<rootDir>/packages/$1/src/index',
  },
};
