module.exports = {
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "babel-jest", // Transforme TypeScript
      "^.+\\.jsx?$": "babel-jest", // Transforme JSX
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1", // Permet d'utiliser @ pour référencer `src`
    },
  };
  