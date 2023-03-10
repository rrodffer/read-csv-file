import { Router } from 'express'
import multer from 'multer'
import taskMiddleware from '../middlewares/tasks.js'

const router = new Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('file'), taskMiddleware.createTask)
router.get('/', taskMiddleware.getTasks)
router.put('/:id', taskMiddleware.putTask)
router.patch('/:id/complete', taskMiddleware.patchTask)
router.delete('/:id', taskMiddleware.deleteTask)

export default router
