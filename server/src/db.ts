import knex from 'knex'
import dbConfig from './knexfile'

export default knex(process.env.NODE_ENV === 'production' ? dbConfig.production : dbConfig.development)
