import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    PG_HOST,
    PG_DB,
    PG_DB_TEST,
    PG_USER,
    PG_PASS,
    PG_PORT,
    NODE_ENV,
} = process.env

let Client

if(NODE_ENV === 'DEV'){
    Client = new Pool({
        host: PG_HOST,
        database: PG_DB,
        user: PG_USER,
        password: PG_PASS,
        port: PG_PORT as unknown as number,
    })
}else if(NODE_ENV === 'TEST' ){
    Client = new Pool({
        host: PG_HOST,
        database: PG_DB_TEST,
        user: PG_USER,
        password: PG_PASS,
        port: PG_PORT as unknown as number,
    })
}

console.log('ENV : ',NODE_ENV)



export default Client as Pool