/**
 * Configuration for the `keg watchtower start` task.
 * Each property maps to a parameter for the `start` task.
 * To learn what each parameter does, run `keg watchtower start -h`.
 */
module.exports = {
  debug: false,
  cleanup: true,
  interval: 300, 
  containers: [],
  rm: true,
  runOnce: false,
  restart: 'unless-stopped',
}