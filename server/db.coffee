knex = require 'knex'
dbConfig = require '../knexfile'

db = knex dbConfig.development

module.exports = db
