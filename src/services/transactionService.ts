import { db } from '../database/connection'

interface CreateTransactionDTO {
  userId: number
  categoryId: number
  description: string
  amount: number
  dueDate: string
  installments?: number
  isPaid?: boolean
}

interface UpdateTransactionDTO {
  description?: string
  amount?: number
  dueDate?: string
  categoryId?: number
  isPaid?: boolean
}

export const transactionService = {

  async create(data: CreateTransactionDTO) {
    const trx = await db.transaction()

    try {
      const totalInstallments = data.installments || 1
      const transactionsToInsert = []

      for (let i = 0; i < totalInstallments; i++) {
        const date = new Date(data.dueDate)

        date.setMonth(date.getMonth() + i)

        transactionsToInsert.push({
          user_id: data.userId,
          category_id: data.categoryId,
          description:
            totalInstallments > 1
              ? `${data.description} (${i + 1}/${totalInstallments})`
              : data.description,
          amount: data.amount,
          due_date: date,

          payment_date: data.isPaid && i === 0 ? new Date() : null,
          installment_current: i + 1,
          installment_total: totalInstallments,
        })
      }

      await trx('transactions').insert(transactionsToInsert)
      await trx.commit()
      return {
        message: `${totalInstallments} transação(ões) criada(s) com sucesso!`,
      }
    } catch (error) {
      await trx.rollback()
      throw error
    }
  },

  async list(userId: number, month?: number, year?: number) {
    const query = db('transactions')
      .join('categories', 'transactions.category_id', 'categories.id')
      .select(
        'transactions.*',
        'categories.name as category_name',
        'categories.type as type'
      )
      .where('transactions.user_id', userId)
      .orderBy('due_date', 'asc')

    if (month && year) {
      query
        .whereRaw('MONTH(due_date) = ?', [month])
        .whereRaw('YEAR(due_date) = ?', [year])
    }

    return await query
  },


  async update(id: number, userId: number, data: UpdateTransactionDTO) {
    const updateData: any = {}

    if (data.description !== undefined)
      updateData.description = data.description
    if (data.amount !== undefined) updateData.amount = data.amount
    if (data.categoryId !== undefined) updateData.category_id = data.categoryId
    if (data.dueDate !== undefined) updateData.due_date = new Date(data.dueDate)

    if (data.isPaid !== undefined) {
      updateData.payment_date = data.isPaid ? new Date() : null
    }


    await db('transactions').where({ id, user_id: userId }).update(updateData)


    if (data.isPaid === true) {
      const currentTransaction = await db('transactions')
        .where({ id, user_id: userId })
        .first()


      if (currentTransaction && currentTransaction.installment_total === 1) {
        const currentDueDate = new Date(currentTransaction.due_date)
        const nextMonthDate = new Date(currentDueDate)
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)


        const nextMonthExists = await db('transactions')
          .where({
            user_id: userId,
            description: currentTransaction.description,

          })
          .whereRaw('MONTH(due_date) = ?', [nextMonthDate.getMonth() + 1])
          .whereRaw('YEAR(due_date) = ?', [nextMonthDate.getFullYear()])
          .first()

        if (!nextMonthExists) {
          await db('transactions').insert({
            user_id: userId,
            category_id: currentTransaction.category_id,
            description: currentTransaction.description,
            amount: currentTransaction.amount,
            due_date: nextMonthDate,
            payment_date: null,
            installment_current: 1,
            installment_total: 1,
          })
        }
      }
    }
  },

  async delete(id: number, userId: number) {
    await db('transactions').where({ id, user_id: userId }).del()
  },
}
