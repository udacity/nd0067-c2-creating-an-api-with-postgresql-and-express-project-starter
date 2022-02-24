import bcrypt from 'bcrypt';
import Client from '../database';

export type User = {
  id: Number | undefined;
  firstname: string;
  lastname: string;
  password: string;
  password_digest?: string
}

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUND as string;

export class UserStore {
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable create user (${u}): ${err}`)
    } 
  }

  async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT password_digest FROM users WHERE firstname=($1) AND lastname=($2)'

      const result = await conn.query(sql, [firstname, lastname])

      conn.release();

      if(result.rows.length) {

        const user = result.rows[0]

        if (bcrypt.compareSync(password+pepper, user.password_digest)) {
          return user
        }
      }
      return null
    } catch(err) {
      throw new Error(`unable to auth user : ${err}`)
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * from users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch(e) {
      throw new Error(`unable to get users : ${e}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * from users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch(e) {
      throw new Error(`unable to get user : ${e}`)
    }
  }
}