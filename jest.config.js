module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  transformIgnorePatterns: ['node_modules/(?!gsap)'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'jest-transform-stub',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@sections/(.*)$': '<rootDir>/src/sections/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jest-environment-jsdom',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
};
