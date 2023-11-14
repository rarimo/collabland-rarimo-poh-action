const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })
dotenv.config()

module.exports = {
  client: 'pg',
  connection: process.env.NEXT_PUBLIC_DB_URL,
}
