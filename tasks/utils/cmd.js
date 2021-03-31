const { isArr, isStr, exists } = require('@keg-hub/jsutils')

/**
 * Helper for addParams and addFlags
 * @param {Object} values - key value pairs for command parameters
 * @param {Function} addFunc - determines how to process a key-value pair
 * @returns {string}
 */
const addAll = (values={}, addFunc) => {
  return Object
    .keys(values)
    .reduce(
      (str, name) => `${str} ${addFunc(name, values[name])}`,
      ''
    )
    .trim()
    .replace(/\s+/g, ' ') 
}

/**
 * Returns a key-value command parameter string
 * @param {string} name - parameter name
 * @param {string} value - param value
 * @returns {string}
 * @example
 * addParam('foo', 2) => "--foo 2"
 */
const addParam = (name, value) => name && exists(value)
  ? `--${name} ${value}`
  : ''

/**
 * Adds multiple parameters to one string
 * @param {Object} params - params
 * @returns {string} joined string
 * @example
 * addParams({ a: 'foo', b: 'bar' })
 * '--a foo --b bar'
 */
const addParams = (params={}) => addAll(params, addParam)

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
 * Adds flags, using keys as flag names
 * @param {Object} flags 
 * @returns {String} flags string
 * @example
 * addFlags({ a: true, b: false})
 * '--a foo'
 */
const addFlags = flags => addAll(flags, addFlag)

/**
 * Gets a string of space-separated string values
 * @param {Array<string>|string} values - either array of strings or csv
 * @returns {string} combined string
 */
const addValues = values => isArr(values)
  ? values.join(' ')
  : isStr(values)
    ? values.replace(/,/g, ' ')
    : ''

module.exports = {
  addFlag,
  addFlags,
  addParam,
  addParams,
  addValues
}