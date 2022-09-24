import client from "../db/db";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[] | void> {
    try{

    const conn = await client.connect();
    const sql = "";
    const result = await conn.query(sql, []);
    conn.release();
    return result.rows[0];
    }
    catch(err:unknown){
        console.log(err);
        throw new Error(err as string);
    }
  }
}
