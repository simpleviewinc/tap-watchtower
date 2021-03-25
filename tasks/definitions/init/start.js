const { spawnCmd } = require('@keg-hub/spawn-cmd')
const os = require('os')

const addParam = (name, value) => name && value
  ? `--${name} ${value}`
  : ''

const addFlag = (name, value) => name && value
  ? `--${name}`
  : ''

const addValues = str => str
  ? str.replace(',', ' ')
  : ''

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
    interval=2*60 // every 2 minutes
  } = params

  return `docker run -d \
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
 * Run parkin tests in container
 * @param {Object} args 
 */
const startWatchtower = async args => {
  console.log('starting watchtower')
  const { params } = args
  const cmd = buildCmd(params)
  params.debug && console.log('Watchtower Command: ', cmd)
  await spawnCmd(cmd)
  await spawnCmd('docker attach watchtower')
  // args.task.cliTask(args)
}

module.exports = {
  start: {
    name: 'start',
    action: startWatchtower,
    example: 'keg watchtower start',
    description : 'Initializes watchtower',
    alias: ['setup', 'init'],
    options: {
      context: {
        alias: [ 'name' ],
        description: '',
        default: null
      },
      debug: {
        alias: ['verbose'],
        description: 'Output logs',
        default: false
      },
      runOnce: {
        description: 'Run watchtower once then immediately exit',
        default: false
      },
      cleanup: {
        description: 'Removes orphaned images once a container is restarted with a new image',
        default: false
      },
      interval: {
        description: 'Time in seconds between image polls',
        default: 5*60, // 5 minutes
      },
      containers: {
        alias: ['c'],
        description: 'Container names to watch. If omitted, watches all containers.',
        example: '--containers evf,keg-proxy,keg-herkin'
      }
    }
  }
}
