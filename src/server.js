import express from 'express'

import tasksRouter from './routes/tasks.js';

const server = express()

server.use(express.json())

server.use('api/v1/tasks', tasksRouter)

server.listen(8800, () => {
  console.log('Backend iniciado! 🛸')
})
