// Update with your config settings.
require('dotenv').config()
const environment = process.env.NODE_ENV || 'development'

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'capstone'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
