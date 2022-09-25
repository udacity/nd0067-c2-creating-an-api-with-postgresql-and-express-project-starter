import client from "../db/db";

type Order = {
  id: number;
  userId: number;
  status: string;
};

export class OrderModel {
  async index(): Promise<Order[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await connnection.query(sql);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log(err);
      throw new Error(`err in fetching all orders, err: ${err as string}`);
    }
  }

  async show(id: number): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=$1;";
      const result = await connnection.query(sql, [id]);
      connnection.release();
      return result.rows[0];
    } catch (err) {
      console.log("err");
      throw new Error(
        `err in fetching order with id ${id}, err: ${err as string}`
      );
    }
  }

  async create(order: Order): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *";
      const result = await connnection.query(sql, [
       order.userId,
       order.status
      ]);
      connnection.release();
      return result.rows[0];
    } catch (err) {
      console.log("err");
      throw new Error(`err in creating order, err: ${err as string}`);
    }
  }
}
