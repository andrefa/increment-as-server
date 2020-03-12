const config = require('../config')

const { IsAuthenticatedMiddleware } = require('../api/middlewares/isAuthenticated')
const { ParseRequestUserMiddleware } = require('../api/middlewares/parseRequestUser')

const { AuthenticationRouter } = require('../api/routes/authentication')
const { CounterRouter } = require('../api/routes/counter')

const { Database } = require('../models/database')
const { CounterModel } = require('../models/counter')
const { UserModel } = require('../models/user')

const { AuthenticationService } = require('../services/authentication')
const { CounterService } = require('../services/counter')

const buildInjector = () => {
  const instances = new Map()
  const get = (name) => instances.get(name)
  const set = (name, instance) => instances.set(name, instance)

  return { instances, get, set }
}

const buildInstances = () => {
  const injector = buildInjector()
  injector.set('injector', injector)
  injector.set('config', config)

  injector.set('Database', new Database(injector.get('config')))
  injector.set('CounterModel', new CounterModel(injector.get('Database')))
  injector.set('UserModel', new UserModel(injector.get('Database')))

  injector.set('AuthenticationService', new AuthenticationService(injector.get('config'), injector.get('UserModel')))
  injector.set('CounterService', new CounterService(injector.get('CounterModel')))

  injector.set('IsAuthenticatedMiddleware', new IsAuthenticatedMiddleware(injector.get('config')))
  injector.set('ParseUserMiddleware', new ParseRequestUserMiddleware())

  injector.set('AuthenticationRouter', new AuthenticationRouter(injector.get('AuthenticationService')))
  injector.set('CounterRouter', new CounterRouter(injector.get('CounterService')))

  return injector
}

module.exports = buildInstances()
