import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

// let client: Pool = new Pool()

// if(ENV === 'test') {
  const client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  })
// }

// if(ENV === 'dev') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   })
// }

export default client