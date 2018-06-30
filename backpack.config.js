module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.coffee'
    config.module.rules.push({
      test: /\.coffee$/,
      use: [ 'coffee-loader' ]
    })
    return config
  },
  // watchers: {
  //   webpack: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   }
  // }
}
