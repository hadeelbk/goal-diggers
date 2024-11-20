
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/test/unitTest/**/*.test.ts'], 
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', 
    },
  },
};