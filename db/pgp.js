const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/parking_lots_app_dev_db";

module.exports = {
  db: pgp(connectionString)
}
