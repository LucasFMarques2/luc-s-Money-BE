import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable('categories', table => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('name').notNullable()
    table.string('type').notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable('transactions', table => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('SET NULL')

    table.string('description').notNullable()
    table.decimal('amount', 10, 2).notNullable()

    table.date('due_date').notNullable()
    table.date('payment_date').nullable()

    table.integer('installment_current').nullable()
    table.integer('installment_total').nullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions')
  await knex.schema.dropTableIfExists('categories')
  await knex.schema.dropTableIfExists('users')
}
