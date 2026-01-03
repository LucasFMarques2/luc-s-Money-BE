import 'dotenv/config' // <--- DEVE SER A PRIMEIRA LINHA
import knex from 'knex'
import config from '../knexfile'

const environment = process.env.NODE_ENV || 'development'

console.log(`🚀 Banco de dados conectando em modo: ${environment}`)

const db = knex(config[environment])

export { db }
