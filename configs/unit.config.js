const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.js'
  ]
}