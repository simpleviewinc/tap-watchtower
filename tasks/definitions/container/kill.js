const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { values } = require('../constants/values')

/**
 * Kill watchtower container
 * @param {Object} args 
 */
const killWatchtower = async args => {
  const { params } = args
  const { force } = params

  const killed = await spawnCmd(
    `docker ${force ? 'kill' : 'stop'} ${values.containerName}`
  ) 

  killed === 1 &&
    console.warn(`Could not kill ${values.containerName}`)
}

module.exports = {
  kill: {
    name: 'kill',
    action: killWatchtower,
    example: 'keg watchtower kill',
    description : 'Kills watchtower container',
    alias: ['quit', 'stop'],
    options: {
      force: {
        alias: [ 'f' ],
        description: 'Forces the container to terminate (using SIGTERM signal via `docker kill`)',
        default: false
      },
    }
  }
}
