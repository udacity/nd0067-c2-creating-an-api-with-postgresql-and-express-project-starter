import bcrypt from 'bcrypt'
import client from '../database'
import { env } from 'process'
import jwt from 'jsonwebtoken'

export type User = {
    UserID?: number | undefined,
    first_name: string,
    last_name: string,
    pass_word: string
}

export class UserStore {
    async createUser(newUser: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users_table (first_name, last_name, pass_word) VALUES ($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const pw_hash = bcrypt.hashSync(
                newUser.pass_word + (process.env.BCRYPT_PASSWORD!), 
                parseInt(process.env.SALT_ROUNDS!)
        );
            const result = await conn.query(sql, [newUser.first_name, newUser.last_name, pw_hash])
            console.log(result)
            const user: User = result.rows[0]
            console.log(user)
            conn.release()
            return user
        } catch(err) {
        throw new Error(`unable create user (${newUser.first_name} ${newUser.last_name}): ${err}`)
        } 
    }

    async showUser(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users_table WHERE UserID=($1)'
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

    async truncateUser(): Promise<User[]> {
        try {
            const sql = `TRUNCATE users_table RESTART IDENTITY CASCADE`
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not truncate table. ${err}`)
        }
    }
}