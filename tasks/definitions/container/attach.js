const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { values } = require('../constants/values')

/**
 * Attach to watchtower container
 * @param {Object} args 
 */
const attach = async () => spawnCmd(
  `docker attach ${values.containerName}`
)

module.exports = {
  attach: {
    name: 'attach',
    action: attach,
    example: 'keg watchtower start',
    description : 'Initializes watchtower',
    alias: ['att', 'init'],
    options: {}
  }
}
