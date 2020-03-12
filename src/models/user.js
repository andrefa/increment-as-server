class UserModel {
  constructor(db) {
    this.db = db
  }

  async findByEmail(email) {
    const result = await this.db.execute('select id, email, password from users where email = $1', [email])
    return this.parseResult(result)
  }

  async create(email, password) {
    const result = await this.db.execute('insert into users (email, password) values ($1, $2) returning *', [email, password])
    return this.parseResult(result)
  }

  parseResult(result) {
    if (result.rowCount === 1) {
      return {
        id: result.rows[0].id,
        email: result.rows[0].email,
        password: result.rows[0].password
      }
    }

    return null
  }
}

module.exports.UserModel = UserModel
