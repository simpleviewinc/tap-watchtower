const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { getConfig } = require('../../utils/getConfig')
const { addParam, addFlag, addValues } = require('../../utils/cmd')
const os = require('os')

// task parameter defaults
const paramDefaults = {
  debug: false,
  runOnce: false,
  debug: false,
  cleanup: false,
  interval: 5*60,
  rm: true
}

/**
 * Builds the docker run command for watchtower, given the parameters
 * @param {Object} params 
 * @returns {string} the command
 */
const buildCmd = params => {
  const dockerSocketPath = '/var/run/docker.sock'
  const dockerRegistryConfigPath = `${os.homedir()}/.docker/config.json`

  const {
    dockerApiSock=dockerSocketPath,
    configPath=dockerRegistryConfigPath,
    cleanup,
    debug,
    runOnce,
    containers,
    rm,
    interval=2*60 // every 2 minutes
  } = params

  return `docker run \
    ${addFlag('rm', rm)} \
    -d \
    --name watchtower \
    -v ${dockerApiSock}:${dockerSocketPath} \
    -v ${configPath}:/config.json \
    containrrr/watchtower \
    ${addFlag('cleanup', cleanup)} \
    ${addFlag('debug', debug)} \
    ${addFlag('run-once', runOnce)} \
    ${addParam('interval', interval)} \
    ${addValues(containers)}`
}

/**
 * @param {Object} taskParams - parameters defined at the task definition
 * @returns {Object} the parameters to use in the task function, derived from config files and command line
 */
const getResolvedParams = taskParams => {
  const { 
    config: configPath, 
    ...cmdParams 
  } = taskParams

  const config = getConfig(configPath)

  // Merge configs together, with precedence order: 
  //  command line task parameters, followed by config files, followed by defaults
  return Object.keys(cmdParams).reduce(
    (acc, key) => {
      acc[key] = cmdParams[key] || config[key] || paramDefaults[key]
      return acc
    },
    {}
  )
}

/**
 * Run parkin tests in container
 * @param {Object} args 
 */
const startWatchtower = async args => {
  const params = getResolvedParams(args.params)

  const cmd = buildCmd(params)
  params.debug && console.log('Running:', cmd)

  await spawnCmd(cmd)
  await spawnCmd('docker attach watchtower')
}



module.exports = {
  start: {
    name: 'start',
    action: startWatchtower,
    example: 'keg watchtower start',
    description : 'Initializes watchtower',
    alias: ['setup', 'init'],
    options: {
      config: {
        alias: [ 'conf' ],
        description: 'Path to optional config file defining param values. By default, tap-watchtower looks for config files (named "watchtower.config.js(on)") in your home directory and in this repo\'s configs directory',
      },
      debug: {
        alias: ['verbose'],
        description: 'Output logs',
      },
      runOnce: {
        description: 'Run watchtower once then immediately exit',
        alias: ['once'],
      },
      cleanup: {
        description: 'Removes orphaned images once a container is restarted with a new image',
      },
      interval: {
        description: 'Time in seconds between image polls',
        default: 5*60, 
      },
      containers: {
        alias: ['c', 'container', 'name', 'names'],
        description: 'Container names to watch. If omitted, watches all containers.',
        example: '--containers evf,keg-proxy,keg-herkin',
      },
      rm: {
        alias: ['remove'],
        description: 'Removes the watchtower container after it exits',
        example: '--rm',
      }
    }
  }
}