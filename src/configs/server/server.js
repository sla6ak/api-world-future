// Импорты базовых пакетов
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const http = require('http')
const WebSocket = require('ws')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const server = http.createServer(app)
const webSocketServer = new WebSocket.Server({ server })

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(
  logger(formatsLogger, {
    skip: function (req, res) {
      return res.statusCode === 200
    }
  })
)

// Список настроек для сервера
// mongoose.set("strictQuery", true);
const optionCors = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: '*'
}
dotenv.config()
app.use(cors(optionCors))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
mongoose.set('strictQuery', false)

module.exports = { app, webSocketServer, server, mongoose }
