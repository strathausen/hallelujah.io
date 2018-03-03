module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.coffee'
    return config
  },
}
