import { Router } from 'express'
import { transactionController } from '../controllers/transactionController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()
router.use(authMiddleware)

router.post('/', transactionController.create)
router.get('/', transactionController.list)
router.patch('/:id', transactionController.update) 
router.delete('/:id', transactionController.delete)

export { router as transactionRoutes }
