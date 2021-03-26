const { tryRequireSync } = require('@keg-hub/jsutils/src/node')
const { deepMerge } = require('@keg-hub/jsutils')
const os = require('os')
const path = require('path')
const appRoot = require('app-root-path').path

const HOME_DIR = os.homedir()

// paths to tap-watchtower configuration files
const configPaths = [
  path.join(appRoot,'configs/watchtower.config.json'),
  path.join(appRoot,'configs/watchtower.config.js'),
  path.join(HOME_DIR, 'watchtower.config.json'),
  path.join(HOME_DIR,'watchtower.config.js'),
]

module.exports = {
  getConfig: (...paths) => deepMerge(
    ...[ 
      ...configPaths, 
      ...paths 
    ].map(tryRequireSync),
  )
}