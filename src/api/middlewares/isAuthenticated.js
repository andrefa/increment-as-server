const jwt = require('jsonwebtoken')

class IsAuthenticatedMiddleware {
  constructor(config) {
    this.config = config
  }

  handler() {
    return (req, res, next) => this.validateToken(req, res, next)
  }

  validateToken(req, res, next) {
    const token = this.getTokenFromHeader(req)

    try {
      jwt.verify(token, this.config.jwt.secret)
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

module.exports.IsAuthenticatedMiddleware = IsAuthenticatedMiddleware
