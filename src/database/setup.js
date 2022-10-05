const knex = require('knex')
const knexConfig = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
  }
}

async function createDatabase() {
  await knex(knexConfig).raw('CREATE DATABASE IF NOT EXISTS teamsoft')
}

createDatabase().catch(console.log).then(process.exit)
