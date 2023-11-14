'use strict'
import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_TEST_DB, NODE_ENV } =
  process.env
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${
  NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB
}`
const client: Pool = new Pool({ connectionString })

export default client
