import type { Config } from "jest";
import nextJest from "next/jest.js";
// import enableHooks from "jest-react-hooks-shallow";

// enableHooks(jest);

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

export default createJestConfig(config);
