module.exports = {
  // Stop the test is there is an error, the standard way would keep the test running
  bail: true,

  // Which provider it's been used
  coverageProvider: "v8",

  // It makes the code to test only the files with the spec.js and not all the files
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
}