const { asyncCmd } = require('@keg-hub/spawn-cmd')
const { values } = require('../constants/values')

/**
 * Gets running state for watchtower
 * @returns {string} - output from docker command
 */
const getState = async () => {
  const { data } = await asyncCmd(
    `docker inspect --format={{.State.Status}} ${values.containerName}`
  )
  return data
}

/**
 * Get inspect data for watchtower
 * @returns {string} - output from docker command
 */
const getInspect = async () => {
  const { data } = await asyncCmd(
    `docker inspect ${values.containerName}`
  ) 
  return data
}


module.exports = { getState, getInspect }