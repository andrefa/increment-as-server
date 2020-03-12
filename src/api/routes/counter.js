const { Router } = require('express')

class CounterRouter {
  constructor(counterService) {
    this.counterService = counterService
  }

  async current(request, response) {
    const { id: userId } = request.user
    const amount = await this.counterService.current(userId)

    response.status(200).json({ counter: amount })
  }

  async next(request, response) {
    const { id: userId } = request.user
    const amount = await this.counterService.next(userId)

    response.status(200).json({ counter: amount })
  }

  async reset(request, response) {
    const { id: userId } = request.user
    const { current } = request.body

    if (this.isInvalid(current)) {
      return response.status(400).json({ message: 'Current value must be a number.' })
    }

    const amount = await this.counterService.reset(userId, current)

    return response.status(200).json({ counter: amount })
  }

  handler() {
    const router = Router()

    router.get('/next', (req, res) => this.next(req, res))
    router.get('/current', (req, res) => this.current(req, res))
    router.put('/current', (req, res) => this.reset(req, res))

    return router
  }

  isInvalid(value) {
    return value == null || value.trim() === '' || isNaN(value)
  }
}

module.exports.CounterRouter = CounterRouter
