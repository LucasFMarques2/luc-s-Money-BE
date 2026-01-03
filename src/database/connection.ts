import knex from 'knex'
import config from '../knexfile'

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const db = knex(config[environment])

export { db }
