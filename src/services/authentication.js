const crypto = require('crypto')
const jwt = require('jsonwebtoken')

class AuthenticationService {
  constructor(config, userModel) {
    this.config = config
    this.userModel = userModel
  }

  async isEmailAvailable(email) {
    const user = await this.userModel.findByEmail(email)
    return user == null
  }

  async register(email, password) {
    const hashedPwd = this.hashPassword(password)
    return this.userModel.create(email, hashedPwd)
  }

  async login(email, password) {
    const user = await this.userModel.findByEmail(email)
    const hashedPwd = this.hashPassword(password)

    if (user == null || user.password !== hashedPwd) {
      throw new Error('Invalid email or password.')
    }

    return user
  }

  hashPassword(password) {
    const [p1, p2, p3] = this.config.auth.salt.split('.')
    const salted = `$${p1}$${password}$${p2}$${p3}$`

    return crypto.createHmac('sha256', this.config.auth.secret).update(salted).digest('hex')
  }

  generateToken(id, email) {
    return jwt.sign({ id, email }, this.config.jwt.secret)
  }
}

module.exports.AuthenticationService = AuthenticationService
