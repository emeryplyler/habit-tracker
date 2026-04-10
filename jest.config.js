module.exports = {
    preset: "ts-jest",
    testEnvironment: 'node',
    verbose: true,
    clearMocks: true,
    testMatch: ["**/*.test.ts"],
    resetModules: false,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};