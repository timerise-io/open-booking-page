module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleDirectories: ['node_modules', 'src'],
    cache: true,
    cacheDirectory: '.jest-cache',
};
