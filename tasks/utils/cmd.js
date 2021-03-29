const { isArr, isStr } = require('@keg-hub/jsutils')

/**
 * Returns a key-value command parameter string
 * @param {string} name - parameter name
 * @param {string} value - param value
 * @returns {string}
 * @example
 * addParam('foo', 2) => "--foo 2"
 */
const addParam = (name, value) => name && value
  ? `--${name} ${value}`
  : ''

/**
 * Returns a command's flag string
 * @param {string} name - flag name
 * @param {string} shouldAdd - if false, returns an empty string
 * @returns {string}
 * @example
 * addFlag('foo', true) => "--foo"
 */
const addFlag = (name, shouldAdd) => name && shouldAdd
  ? `--${name}`
  : ''

/**
 * Gets a string of space-separated string values
 * @param {Array<string>|string} values - either array of strings or csv
 * @returns {string} combined string
 */
const addValues = values => isArr(values)
  ? values.join(' ')
  : isStr(values)
    ? values.replace(',', ' ')
    : ''

module.exports = {
  addFlag,
  addParam,
  addValues
}