const { Pool } = require('pg')

class Database {
  constructor(config) {
    const { db: { uri: connectionString } } = config
    this.pool = new Pool({ connectionString })
  }

  async execute(query, parameters) {
    return this.pool.query(query, parameters)
  }
}

module.exports.Database = Database
