class CounterModel {
  constructor(db) {
    this.db = db
  }

  async findByUserId(userId) {
    const result = await this.db.execute('select user_id, amount from counters where user_id = $1', [userId])
    return this.parseResult(result)
  }

  async create(userId, amount) {
    const result = await this.db.execute('insert into counters (user_id, amount) values($1, $2) returning *', [userId, amount])
    return this.parseResult(result)
  }

  async update(userId, amount) {
    const result = await this.db.execute('update counters set amount = $2 where user_id = $1 returning *', [userId, amount])
    return this.parseResult(result)
  }

  parseResult(result) {
    if (result.rowCount === 1) {
      return {
        userId: result.rows[0].user_id,
        amount: result.rows[0].amount
      }
    }

    return null
  }
}

module.exports.CounterModel = CounterModel
