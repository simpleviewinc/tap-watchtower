const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { exists } = require('@keg-hub/jsutils')
const { values } = require('../constants/values')
const { getConfig } = require('../../utils/getConfig')

/**
 * Logs the watchtower container's running state
 */
const printState = async () => {
  process.stdout.write(`"${values.containerName}" status:\t`)
  await spawnCmd(
    `docker inspect --format={{.State.Status}} ${values.containerName}`
  )
  process.stdout.write('\n')
}

/**
 * Logs the watchtower global config
 */
const printConfig = () => {
  const config = getConfig()
  const configStr = JSON.stringify(config, null, 2)
  console.log('Global Config:')
  process.stdout.write(configStr)
  console.log('\n')
}

/**
 * Logs the docker inspect output for the container 
 */
const printInspect = async () => {
  console.log(`"${values.containerName}" inspect results:`)
  await spawnCmd(
    `docker inspect ${values.containerName}`
  )
  console.log()
}

/**
 * @param {Object} params 
 * @returns {boolean} true if no flags were passed to the params object
 */
const noFlagsSpecified = params => Object.keys(taskOptions).every(key => !exists(params[key]))

/**
 * Prints out status of the watchtower container
 */
const status = async (args) => {
  const { params } = args
  const { verbose, ...flags } = params
  const { config, state, inspect } = flags

  const noFlags = noFlagsSpecified(flags)

  ;(noFlags || verbose || state) && await printState()
  ;(noFlags || verbose || config) && await printConfig()
  ;(verbose || inspect) && await printInspect() 
}

const taskOptions = {
  config: {
    description: 'If set, prints out the global watchtower config, but nothing else (unless other flags are set too)',
    example: 'keg watchtower status --config',
    alias: ['c'],
    default: undefined,
  },
  state: {
    description: 'If set, prints out the running state, but nothing else (unless other flags are set too)',
    example: 'keg watchtower status --state',
    alias: ['s'],
    default: undefined,
  },
  inspect: {
    description: 'If set, runs `docker inspect` for the container, but prints out nothing else (unless other flags are set too)',
    example: 'keg watchtower status --inspect',
    alias: ['i'],
    default: undefined,
  },
  verbose: {
    description: 'If set, prints out all status. Equivalent to running task with all flags set.',
    example: 'keg watchtower status --verbose',
    alias: ['v'],
    default: undefined,
  }
}

module.exports = {
  status: {
    name: 'status',
    action: status,
    example: 'keg watchtower status',
    description : 'Prints out the status of the watchtower container. If no flags are set, it prints out the running state and the global config.',
    alias: ['stat', 'info'],
    options: taskOptions
  }
}
