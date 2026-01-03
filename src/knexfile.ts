import type { Knex } from 'knex'
import 'dotenv/config' // Carregamento mais simples e direto
import path from 'path'

// Verificação de segurança para garantir que as variáveis carregaram
if (!process.env.DB_PASSWORD && !process.env.DATABASE_URL) {
  console.warn('⚠️ Aviso: Variáveis de ambiente não detectadas no Knexfile!')
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
    connection: process.env.DATABASE_URL
      ? {
          uri: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
        }
      : {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          ssl: { rejectUnauthorized: false },
        },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: path.resolve(__dirname, 'database', 'migrations'),
      extension: 'js',
    },
  },
}

export default config
