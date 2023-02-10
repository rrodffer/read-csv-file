import { Router } from 'express'
import taskMiddleware from '../middlewares/tasks.js'

const router = new Router()

router.post('/', taskMiddleware.createTask)
router.get('/', taskMiddleware.getTasks)
router.put('/:id', taskMiddleware.putTask)
router.patch('/:id/complete', taskMiddleware.patchTask)
router.delete('/:id', taskMiddleware.deleteTask)

export default router
