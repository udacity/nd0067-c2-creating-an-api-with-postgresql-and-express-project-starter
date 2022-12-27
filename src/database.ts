import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const PG_HOST = '127.0.0.1'
const PG_DB = 'mickaella_store'
const PG_USER = 'postgres'
const PG_PASS = '0000'
const PG_PORT = 5432

const Client = new Pool({
    host: PG_HOST,
    database: PG_DB,
    user: PG_USER,
    password: PG_PASS,
    port: PG_PORT,
})

export default Client