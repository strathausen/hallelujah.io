require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    propagateCreateError: true,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
  },

}
