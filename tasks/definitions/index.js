const { isObj, isFunc, mapObj } = require('@keg-hub/jsutils')

const injectWatchtowerConfig = taskAction => {
  return args => taskAction({
    ...args,
    watchtowerConfig: {}
  })
}

const initialize = tasks => {
  mapObj(tasks, (_, task) => {
    task.action = isFunc(task.action) 
      ? injectWatchtowerConfig(task.action)
      : undefined,
    task.tasks = isObj(task.tasks)
      ? initialize(task.tasks)
      : undefined
  })

  return tasks
}

module.exports = {
  ...initialize(require('./container')),
}