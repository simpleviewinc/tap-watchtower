const { spawnCmd } = require('@keg-hub/spawn-cmd')

/**
 * Kill watchtower container
 * @param {Object} args 
 */
const killWatchtower = async args => {
  const { params } = args
  const { force } = params
  const killed = await spawnCmd(`docker ${force ? 'kill' : 'stop'} watchtower`) 
  if (killed === 1)
    console.warn('Could not kill container')
  await spawnCmd('docker rm watchtower') 
}

module.exports = {
  kill: {
    name: 'kill',
    action: killWatchtower,
    example: 'keg watchtower kill',
    description : 'Kills watchtower',
    alias: ['quit', 'stop'],
    options: {
      force: {
        alias: [ 'f' ],
        default: false
      },
    }
  }
}
