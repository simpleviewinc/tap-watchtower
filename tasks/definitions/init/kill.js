const { spawnCmd } = require('@keg-hub/spawn-cmd')

/**
 * Run parkin tests in container
 * @param {Object} args 
 */
const killWatchtower = async args => {
  const { params } = args
  const { force } = params
  // const cmd = buildCmd(params)
  const killed = await spawnCmd(`docker ${force ? 'kill' : 'stop'} watchtower`) 
  const removed = await spawnCmd('docker rm watchtower') 
  console.log({killed, removed})
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
