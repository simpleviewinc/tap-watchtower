module.exports = {
  name: 'tap-watchtower',
  displayName: 'Watchtower',
  keg: {
    cli: {
      link: {
        name: 'watchtower'
      },
    },
    routes: {
      '/': 'RootContainer'
    },
  },
  expo: {
    name: 'tap-watchtower',
    slug: 'tap-watchtower',
  }
}
