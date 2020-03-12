const { Router } = require('express')

class AuthenticationRouter {
  constructor(authService) {
    this.authService = authService
  }

  async register(request, response) {
    const { email, password } = request.body
    if (AuthenticationRouter.isInvalid(email) || AuthenticationRouter.isInvalid(password)) {
      return response.status(400).json('Email or password not informed.')
    }

    const isEmailAvailable = await this.authService.isEmailAvailable(email)

    if (!isEmailAvailable) {
      return response.status(400).json('Email already in use.')
    }

    const user = await this.authService.register(email, password)
    return this.respondToken(response, user.id, user.email)
  }

  async login(request, response) {
    const { email, password } = request.body
    if (this.isInvalid(email) || this.isInvalid(password)) {
      return response.status(400).json('Email or password not informed.')
    }

    try {
      const user = await this.authService.login(email, password)
      return this.respondToken(response, user.id, user.email)
    } catch (error) {
      console.error(error)
      return response.status(401).json({ message: 'Invalid email or password.' })
    }
  }

  handler() {
    const router = Router()

    router.post('/register', (req, res) => this.register(req, res))
    router.post('/login', (req, res) => this.login(req, res))

    return router
  }

  respondToken(response, id, email) {
    const token = this.authService.generateToken(id, email)
    response.status(200).json({ token })
  }

  isInvalid(value) {
    return value == null || value.trim() === ''
  }
}

module.exports.AuthenticationRouter = AuthenticationRouter
