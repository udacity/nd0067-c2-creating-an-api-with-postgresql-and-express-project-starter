import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRound = process.env.SALT_ROUND as string;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  loginName: string;
  password: string;
};

export class MyUserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await client.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('Can not get Users ${err}');
    }
  }
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(b: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, login_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(b.password + pepper, parseInt(saltRound));

      const conn = await client.connect();
      const result = await conn.query(sql, [b.firstName, b.lastName,b.loginName, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user . Error: ${err}`);
    }
  }

  async authenticate(
    loginName: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql = 'SELECT password FROM users WHERE login_name=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [loginName]);
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Can not authenticate user ${loginName}. Error: ${err}`);
    }
  }
}
