import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del()

  await knex('categories').insert([

    { user_id: 1, name: 'Salário', type: 'INCOME' },
    { user_id: 1, name: 'Extra', type: 'INCOME' },

    { user_id: 1, name: 'Habitação', type: 'EXPENSE' },
    { user_id: 1, name: 'Contas Básicas', type: 'EXPENSE' },
    { user_id: 1, name: 'Saúde', type: 'EXPENSE' },
    { user_id: 1, name: 'Educação', type: 'EXPENSE' },
    { user_id: 1, name: 'Assinaturas', type: 'EXPENSE' },

    { user_id: 1, name: 'Esporte', type: 'EXPENSE' },
    { user_id: 1, name: 'Religião/Doação', type: 'EXPENSE' },
    { user_id: 1, name: 'Transporte', type: 'EXPENSE' },


    { user_id: 1, name: 'Cartão de Crédito', type: 'EXPENSE' },
    { user_id: 1, name: 'Empréstimos', type: 'EXPENSE' },
    { user_id: 1, name: 'Casa/Móveis', type: 'EXPENSE' },

    { user_id: 1, name: 'Investimento', type: 'EXPENSE' },
  ])
}
