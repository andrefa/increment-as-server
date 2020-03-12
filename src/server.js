require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')

const injector = require('./di/injector')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(
  '/auth',
  injector.get('AuthenticationRouter').handler()
)
app.use(
  '/counter',
  injector.get('IsAuthenticatedMiddleware').handler(),
  injector.get('ParseUserMiddleware').handler(),
  injector.get('CounterRouter').handler()
)

app.listen({ port: config.app.port }, () => console.log(`🚀 Server running at port ${config.app.port}`))
