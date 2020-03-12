const jwt = require('jsonwebtoken')

class ParseRequestUserMiddleware {
  constructor(config) {
    this.config = config
  }

  handler() {
    console.log(this.config)
    return (req, res, next) => this.parseRequestUser(req, res, next)
  }

  parseRequestUser(req, res, next) {
    const token = this.getTokenFromHeader(req)

    try {
      req.user = jwt.decode(token)
      next()
    } catch (error) {
      console.error(error)
      res.json({ message: 'Invalid authorization token provided.' }).status(401)
    }
  }

  getTokenFromHeader(request) {
    const { authorization } = request.headers

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1]
    }

    return null
  }
}

module.exports.ParseRequestUserMiddleware = ParseRequestUserMiddleware
