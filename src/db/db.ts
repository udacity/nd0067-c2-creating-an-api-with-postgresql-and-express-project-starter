import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config()

// console.log('process.env',process.env)
const {  DB_USERNAME, HOST, DATABASE, DATABASE_TEST, PASSWORD, ENV } = process.env;

let usedDatabase: string | undefined = DATABASE;
if (ENV === "TEST") { usedDatabase = DATABASE_TEST;
}

// let usedDatabase = DATABASE_TEST;
const client = new Pool({
  user: DB_USERNAME,
  host: HOST,
  database: usedDatabase,
  password: PASSWORD,
  port: 5432,
});

export default client;
