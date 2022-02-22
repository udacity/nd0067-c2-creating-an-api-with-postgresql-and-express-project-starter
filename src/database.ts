import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
  host,
  database,
  database_test,
  user,
  password,
  ENV
} = process.env

const client = new Pool({
  host,
  database : ENV === "test" ? database_test : database,
  user,
  password
})

export default client