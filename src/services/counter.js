class CounterService {
  constructor(counterModel) {
    this.counterModel = counterModel
  }

  async current(userId) {
    let counter = await this.counterModel.findByUserId(userId)
    if (counter == null) {
      counter = await this.initUserCount(userId, 1)
    }

    return counter.amount
  }

  async next(userId) {
    let counter = await this.counterModel.findByUserId(userId)

    if (counter == null) {
      counter = await this.initUserCount(userId, 2)
    } else {
      counter = await this.counterModel.update(userId, counter.amount + 1)
    }

    return counter.amount
  }

  async reset(userId, amount) {
    let counter = await this.counterModel.findByUserId(userId)

    if (counter == null) {
      counter = await this.initUserCount(userId, amount)
    } else {
      counter = await this.counterModel.update(userId, amount)
    }

    return counter.amount
  }

  async initUserCount(userId, amount) {
    return this.counterModel.create(userId, amount)
  }
}

module.exports.CounterService = CounterService
