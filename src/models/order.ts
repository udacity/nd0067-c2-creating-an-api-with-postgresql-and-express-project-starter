import client from '../database';

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export class MyOrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await client.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('Can not get orders ${err}');
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [b.status, b.userId]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new order . Error: ${err}`);
    }
  }
  async currentUserOrder(userId: string): Promise<Order> {
    try {
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) and status = "active"';
      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find orders for user ${userId}. Error: ${err}`
      );
    }
  }

  async completedUserOrders(userId: string): Promise<Order[]> {
    try {
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) and status = "complete" ';
      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find orders for user ${userId}. Error: ${err}`
      );
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)';
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(
        'Can not add product ${productId} to order ${orderId}: ${err}'
      );
    }
  }
}
