const { Router } = require('express')

class CounterRouter {
  constructor(counterService) {
    this.counterService = counterService
  }

  async current(request, response) {
    const { id: userId } = request.user
    const amount = await this.counterService.current(userId)

    response.json({ counter: amount }).status(200)
  }

  async next(request, response) {
    const { id: userId } = request.user
    const amount = await this.counterService.next(userId)

    response.json({ counter: amount }).status(200)
  }

  async reset(request, response) {
    const { id: userId } = request.user
    const { current } = request.body

    if (this.isInvalid(current)) {
      return response.json({ message: 'Current value must e a number.' }).status(400)
    }

    const amount = await this.counterService.reset(userId, current)

    return response.json({ counter: amount }).status(200)
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
