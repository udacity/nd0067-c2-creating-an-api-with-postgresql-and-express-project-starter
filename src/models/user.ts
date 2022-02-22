import bcrypt from 'bcrypt';
import Client from '../database';

export type User = {
  id: Number | undefined;
  firstname: string;
  lastname: string;
  password: string;
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
    const conn = await Client.connect()
    const sql = 'SELECT password_digest FROM users WHERE firstname=($1) AND lastname=($2)'

    const result = await conn.query(sql, [firstname, lastname])

    console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)

      if (bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user
      }
    }

    return null
  }
}