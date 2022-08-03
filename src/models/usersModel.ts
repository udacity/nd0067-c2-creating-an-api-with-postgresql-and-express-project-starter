import bcrypt from 'bcrypt'
import client from '../database'
import { env } from 'process'

export type User = {
    id?: Number,
    first_name: String,
    last_name: String,
    pass_word: String
}

export class UserStore {
    async createUser(u: User): Promise<User> {
        try {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'INSERT INTO users (first_name, last_name, pass_word) VALUES($1, $2) RETURNING *'
        const hash = bcrypt.hashSync(
            u.pass_word + (process.env.BCRYPT_PASSWORD as string), 
            parseInt(process.env.SALT_ROUNDS as string)
        );

        const result = await conn.query(sql, [u.first_name, u.last_name, hash])
        const user = result.rows[0]

        conn.release()

        return user
        } catch(err) {
        throw new Error(`unable create user (${u.first_name} ${u.last_name}): ${err}`)
        } 
    }

    async showUser(id: String): Promise<User> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users_table WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get user. Error: ${err}`)
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users_table'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
}