const { tryRequireSync } = require('@keg-hub/jsutils/src/node')
const { deepMerge } = require('@keg-hub/jsutils')
const os = require('os')
const path = require('path')
const appRoot = require('app-root-path').path

const HOME_DIR = os.homedir()
const KEG_CONFIG_DIR = path.join(HOME_DIR, '.kegConfig')
const FILE_NAME = 'watchtower.config'

// paths to tap-watchtower configuration files where
// entries at the end take precedent over entries at the start
const configPaths = [
  path.join(appRoot, 'configs', `${FILE_NAME}.json`),
  path.join(appRoot, 'configs', `${FILE_NAME}.js`),
  path.join(KEG_CONFIG_DIR, `${FILE_NAME}.json`),
  path.join(KEG_CONFIG_DIR, `${FILE_NAME}.js`),
  path.join(HOME_DIR, `${FILE_NAME}.json`),
  path.join(HOME_DIR,`${FILE_NAME}.js`),
]

module.exports = {
  /**
   * @param  {...string} paths - optional paths to configuration files 
   *  - these take precedent over the default locations -- see `configPaths` array
   * @returns {object} the merged configuration object from all the paths
   */
  getConfig: (...paths) => deepMerge(
    ...[ 
      ...configPaths, 
      ...paths 
    ].map(tryRequireSync),
  )
}