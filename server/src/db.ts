import knex from 'knex'
import dbConfig from './knexfile'
import {Pool} from 'pg'

export default knex(process.env.NODE_ENV === 'production' ? dbConfig.production : dbConfig.development)

export const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
})
