import type { Knex } from 'knex'
import 'dotenv/config'
import path from 'path'

if (!process.env.DATABASE_URL) {
  console.error('❌ ERRO CRÍTICO: DATABASE_URL não encontrada nas variáveis de ambiente!')
}

const config: Knex.Config = {
  client: 'mysql2',
  connection: process.env.DATABASE_URL,
  pool: { min: 2, max: 10 },
  migrations: {
    directory: path.resolve(__dirname, 'database', 'migrations'),
    extension: 'js',
  },
}

export default config
