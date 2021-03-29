const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { values } = require('../constants/values')
const { getConfig } = require('../../utils/getConfig')

/**
 * Prints out status 
 */
const status = async () => {
  process.stdout.write('Watchtower status:\t')
  await spawnCmd(
    `docker inspect --format={{.State.Status}} ${values.containerName}`
  )

  const config = getConfig()

  console.log('\nConfig:\n', JSON.stringify(config, null, 2))
}

module.exports = {
  status: {
    name: 'status',
    action: status,
    example: 'keg watchtower status',
    description : 'Prints out the status of the watchtower container and its current global config',
    alias: ['stat', 'info'],
    options: {}
  }
}
