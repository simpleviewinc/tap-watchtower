# Overview

`tap-watchtower` is a wrapper around [Watchtower](https://containrrr.dev/watchtower/introduction/) for the simpleviewinc/keg-hub project.
It will automatically restart any container running on your machine whenever new images are pushed to registries.

## Setup
* First, setup [keg-cli](https://github.com/simpleviewinc/keg-cli) on your machine
* Install dependencies: `yarn install`
* See the [configuration](#configuration) section to learn about configuring watchtower

## Tasks

`tap-watchtower` provides these tasks:

* `keg watchtower attach`
* `keg watchtower kill`
* `keg watchtower log`
* `keg watchtower start`
* `keg watchtower status`

Run the help commands to learn more (e.g. `keg watchtower start -h`)

## Configuration

* In addition to running `start` with parameters, you can also define a `watchtower.config.js(on)` file 
* see `configs/watchtower-template.config.js` for a template
* `tap-watchtower` expects your config to be defined in one of three places:
  * this project's `configs/` directory
  * your `.kegConfig` directory
  * your home directory
* alternatively, you can pass a custom config path to the `start` task using the `--config` parameter
* each property in your config maps to a parameter in the `start` task
* any specified command line parameters will override the same values in your config

## Tests
* `yarn test:unit` or `yarn:test`
* `yarn test:e2e` 
  * end-to-end tests
  * starts the container on your machine
* `yarn test:all`
  * unit and e2e

