import { PoolClient } from 'pg'
import client from '../db/database'
import bcrypt from 'bcrypt'

export type UserType = {
  first_name: string
  last_name: string
  email: string
  password?: string
}

export type UserDB = {
  readonly id: number
}

export type User = UserType & UserDB

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export class UserStore {
  async index(): Promise<User[]> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM users'
      const users: User[] = (await connection.query(sql)).rows
      return users.map(({ password, ...rest }) => rest)
    } catch (error) {
      throw new Error(`Cannot get users ${error}`)
    } finally {
      connection.release()
    }
  }

  async show(id: number): Promise<User> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM users WHERE id=($1);'
      const sqlValues = [id]
      const users: User[] = (await connection.query(sql, sqlValues)).rows
      return users.map(({ password, ...rest }) => rest)[0]
    } catch (err) {
      throw new Error(`Could not find user with id ${id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async create(user: UserType): Promise<User> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')
      const exitsingUserSQL = 'SELECT * from users where email=($1);'
      const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;'

      if (!BCRYPT_PASSWORD) {
        throw new Error('Missing env variable: BCRYPT_PASSWORD')
      }

      if (!SALT_ROUNDS) {
        throw new Error('Missing env variable: SALT_ROUNDS')
      }

      if (!user.first_name || !user.last_name || !user.email || !user.password) {
        throw new Error('Missing user properties')
      }

      const existingUser = (await connection.query(exitsingUserSQL, [user.email])).rows[0]

      if (existingUser) {
        return existingUser
      }

      const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS))
      const sqlValues = [user.first_name, user.last_name, user.email, hash]
      const createdUser: User = (await connection.query(sql, sqlValues)).rows[0]

      await connection.query('COMMIT')
      return createdUser
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not create new user: ${user.first_name} ${user.last_name}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM users where email=($1);'
      const sqlValues = [email]

      const user: User = (await connection.query(sql, sqlValues)).rows[0]

      if (!user) {
        throw new Error('Could not find user')
      }

      if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password || '')) {
        return user
      }
      return null
    } catch (err) {
      throw new Error(`Cannot authenticate user ${err}`)
    } finally {
      connection.release()
    }
  }
}
