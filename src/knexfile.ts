import type { Knex } from 'knex'
import 'dotenv/config'
import path from 'path'

if (!process.env.DATABASE_URL) {
  console.warn('⚠️ DATABASE_URL não definida!')
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.resolve(__dirname, 'database', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.resolve(__dirname, 'database', 'seeds'),
      extension: 'ts',
    },
  },

  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL, 
    pool: { min: 2, max: 10 },
    migrations: {
      directory: path.resolve(__dirname, 'database', 'migrations'),
      extension: 'js',
    },
  },
}

export default config
