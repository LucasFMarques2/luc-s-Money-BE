import 'dotenv/config'
import knex from 'knex'
import config from '../knexfile'

console.log(
  `🚀 Tentando conexão com: ${
    process.env.DATABASE_URL ? 'URL Detectada' : 'URL VAZIA'
  }`
)

const db = knex(config)

export { db }
