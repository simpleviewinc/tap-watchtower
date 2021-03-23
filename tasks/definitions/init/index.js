module.exports = {
  init: {
    name: 'init',
    alias: ['setup'],
    description: 'Initializes the watchtower container',
    example: 'init',
    tasks: {
      ...require('./init'),
    }
  }
}