const tasks = require('../definitions')
const path = require('path')

const configPath = path.join(__dirname, 'mockConfig.js')

const startOptions = {
  debug: undefined,
  runOnce: undefined,
  debug: undefined,
  cleanup: undefined,
  interval: undefined,
  rm: undefined,
}

describe('Container tasks', () => {
  afterEach(async () => {
    // ensure the container is killed
    const orig = console.warn
    console.warn = jest.fn()
    await tasks.kill.action({ params: { force: true } })
    console.warn = orig
  })

  it('should be able to start, inspect, log, and stop the container', async () => {
    await tasks.start.action({ params: { ...startOptions, config: configPath }}) 

    const { state } = await tasks.status.action({ params: { state: true }}) 
    expect(state).toEqual(expect.stringContaining('running'))
    
    await new Promise(res => setTimeout(res, 1000))

    const logs = await tasks.log.action({ params: {}, options: [] })
    expect(logs.length).toBeGreaterThan(0)

    await tasks.kill.action({ params: { rm: true }}) 
    
    const { state: postState } = await tasks.status.action({ params: { state: true }}) 
    expect(postState).toEqual(expect.stringContaining('No container'))
  })
})