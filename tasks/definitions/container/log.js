const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { values } = require('../constants/values')

/**
 * Simply calls docker logs command for the watchtower container with the options
 * @param {Array<string>} options - docker logs options
 * @returns 
 */
const showLogs = options => {
  return spawnCmd(
    `docker logs ${values.containerName} ${options.join(' ')}`
  )
}

/**
 * Simply outputs the log file path for watchtower
 */
const showPathToOutputFile = async () => {
  process.stdout.write(`${values.containerName} log file path:\n\t`)
  await spawnCmd(
    `docker inspect --format='{{.LogPath}}' ${values.containerName}`
  ) 
  console.log()
}

/**
 * Kill watchtower container
 * @param {Object} args 
 */
const logWatchtower = async args => {
  const { params } = args
  const { output } = params

  return output
    ? showPathToOutputFile()
    : showLogs(args.options)
}

module.exports = {
  log: {
    name: 'log',
    action: logWatchtower,
    example: 'keg watchtower log',
    description : 'Shows watchtower container logs. Accepts standard "docker logs" options.',
    alias: ['logs'],
    options: {
      output: {
        alias: ['out'],
        description: 'If true, only prints out the path to the docker log file.',
        default: false
      }
    }
  }
}
