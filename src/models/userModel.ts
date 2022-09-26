import client from "../db/db";

type User = {
  //id will not be provided in request in signup process so this is why i put (?) (but we could be more specific and create a user response type
  // along with a user request type)
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
  hash?: string;
};

export class UserModel {
  async create(user: User): Promise<User | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO users(firstname, lastname, hash) VALUES ($1, $2, $3) RETURNING *;";
      const result = await connnection.query(sql, [
        user.firstname,
        user.lastname,
        user.hash,
      ]);
      connnection.release();
      const { id, firstname, lastname } = result.rows[0];
      return { id, firstname, lastname };
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating user, err: ${err as string}`);
    }
  }

  async delete(userId: string): Promise<User[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "DELETE FROM users where id=$1;";
      const result = await connnection.query(sql, [userId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating user, err: ${err as string}`);
    }
  }

  async index(): Promise<User[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await connnection.query(sql);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log(err);
      throw new Error(`err in fetching all usres, err: ${err as string}`);
    }
  }

  async show(userId: string): Promise<User | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1;";
      const result = await connnection.query(sql, [userId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching user with userId ${userId}, err: ${err as string}`
      );
    }
  }
}
