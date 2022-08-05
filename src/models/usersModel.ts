import bcrypt from 'bcrypt'
import client from '../database'
import { env } from 'process'
import jwt from 'jsonwebtoken'

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    pass_word: string
}

export class UserStore {
    async createUser(u: User): Promise<User> {
        try {
        // @ts-ignore
        const sql = 'INSERT INTO users_table (first_name, last_name, pass_word) VALUES($1, $2, $3) RETURNING *'
        const conn = await client.connect()
        const pw_hash = bcrypt.hashSync(
            u.pass_word + (process.env.BCRYPT_PASSWORD!), 
            parseInt(process.env.SALT_ROUNDS!)
        );
        const result = await conn.query(sql, [u.first_name, u.last_name, pw_hash])
        const user: User = result.rows[0]
        conn.release()
        return user
        } catch(err) {
        throw new Error(`unable create user (${u.first_name} ${u.last_name}): ${err}`)
        } 
    }

    async showUser(id: Number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users_table WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get user. Error: ${err}`)
        }
    }

    async showAllUsers(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users_table'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }
}