import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'

import tasksRouter from './routes/tasks.js';

const server = express()
dotenv.config();

const connectionURL = process.env.MONGO_URL

mongoose.connect(connectionURL, {
  useNewUrlParser: true
})

const dbConnection = mongoose.connection;

dbConnection.once('connecting', onConnecting);
dbConnection.once('connected', onConnected);
dbConnection.on('error', onError);

function onConnecting() {
  console.log(
    `Tentativa de conexão com o banco de dados iniciada.`,
  );
}

function onConnected() {
  console.log(
    `Conexão com o banco de dados efetuada com sucesso 🐳`,
  );
}

function onError(error) {
  console.error(
    `Erro durante operação no banco de dados: ${error}`,
  );
}

server.use(express.json())
server.use(helmet());
server.use(morgan('combined'))

server.use('/api/v1/tasks', tasksRouter)

server.listen(8800, () => {
  console.log('Backend iniciado! 🛸')
})
