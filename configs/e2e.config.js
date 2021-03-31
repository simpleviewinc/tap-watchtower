const jestConfig = require('./unit.config.js')

module.exports = {
  ...jestConfig,
  testMatch: [
    '**/__e2e__/**/*.test.js'
  ]
}