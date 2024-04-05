const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE || "postgres://localhost:5432/covidit_dev_db";

module.exports = {
  db: pgp(connectionString)
}
