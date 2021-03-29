# Overview

`tap-watchtower` is a wrapper around [Watchtower](https://containrrr.dev/watchtower/introduction/) for the simpleviewinc/keg-hub project.
It will automatically restart any container running on your machine whenever new images are pushed to registries.

## Tasks

`tap-watchtower` implements four tasks:

* `keg watchtower start`
* `keg watchtower kill`
* `keg watchtower attach`
* `keg watchtower status`

Run the help commands (e.g. `keg watchtower start -h`) to learn more.

## Configuration

* In addition to running `start` with parameters, you can also define a `watchtower.config.js(on)` file in your home directory
* see `configs/watchtower-template.config.js` for a template
* each property maps to a parameter for the `start` command
  * command line parameters will take precedence if they are defined, however
