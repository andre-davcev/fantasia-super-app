export default {
  displayName: 'fantasia-angular',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/fantasia-angular',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  collectCoverageFrom: [
    // TEST TYPESCRIPT
    'src/**/*.ts',

    // DO NOT TEST
    '!src/**/*.spec.ts', // Unit tests
    '!src/**/stories/**', // Storybook Project
    '!src/**/*.stories.ts', // Storybook Files
    '!src/**/index.ts', // Barrel files
    '!src/**/*.module.ts', // Modules
    '!src/**/environments/**', // Environments
    '!src/**/main.ts', // Main
    '!src/**/polyfills.ts', // Polyfills
    '!src/**/*.mock.ts', // Mocks
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },
};
