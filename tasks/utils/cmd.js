const { isArr, isStr } = require('@keg-hub/jsutils')

/**
 * Returns a key-value command parameter string
 * @param {string} name 
 * @param {string} value 
 * @returns {string}
 */
const addParam = (name, value) => name && value
  ? `--${name} ${value}`
  : ''

/**
 * Returns a command's flag string
 * @param {string} name 
 * @param {string} value 
 * @returns {string}
GGG@example
 * addFlag('foo', 2) => "--foo 2"
 */
const addFlag = (name, value) => name && value
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