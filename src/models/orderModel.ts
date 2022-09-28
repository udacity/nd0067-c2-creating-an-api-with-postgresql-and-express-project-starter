import client from "../db/db";

export type Order = {
  id?: number;
  userId: number;
  status?: string;
  // when fetching associated products to an order
};
type OrderWithProducts = {
  orderId: number;
  userId: number;
  status: string;
  productId: number;
  quantity: number
}

export class OrderModel {
  async create(order: Order): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql = "INSERT INTO orders (userId) VALUES ($1) RETURNING *;";
      const result = await connnection.query(sql, [order.userId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating order, err: ${err as string}`);
    }
  }

  async getOrdersByUserId(userId: string): Promise<OrderWithProducts[] | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "SELECT o_p.productId, u.id as userId, o.id as orderId, o.status, o_p.quantity FROM users u INNER JOIN orders o ON u.id = o.userId INNER JOIN orders_products o_p ON o.id = o_p.orderId WHERE u.id =$1;";
      const result = await connnection.query(sql,[userId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with userId ${userId}, err: ${err as string}`
      );
    }
  }

  async checkIfUserOwnThisOrder(
    userId: string,
    orderId: string
  ): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM orders WHERE userId=$1 AND id=$2;";
      const result = await connnection.query(sql, [userId, orderId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with orderId and userId ${userId}, err: ${
          err as string
        }`
      );
    }
  }

  //optional method
  async getCompletedOrdersByUserId(userId: number): Promise<OrderWithProducts[] | void> {
    try {
      const connnection = await client.connect();
      const sql = 
        "SELECT o_p.productId, u.id as userId, o.id as orderId, o.status, o_p.quantity FROM users u INNER JOIN orders o ON u.id = o.userId INNER JOIN orders_products o_p ON o.id = o_p.orderId WHERE u.id=$1 AND o.status='complete';";
      const result = await connnection.query(sql, [userId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with userId ${userId}, err: ${err as string}`
      );
    }
  }

  //optional method
  async setOrderStatus(
    orderId: number,
    userId: number,
    status: string
  ): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql = "UPDATE orders SET status=$1 WHERE id=$2 AND userId=$3;";
      const result = await connnection.query(sql, [status, orderId, userId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with userId ${userId}, err: ${err as string}`
      );
    }
  }
  // [Extra] dangerous (ON DELETE CASCADE)
  // async delete(orderId: string): Promise<Order[] | void> {
  //   try {
  //     const connnection = await client.connect();
  //     const sql = "DELETE FROM orders where id=$1;";
  //     const result = await connnection.query(sql, [orderId]);
  //     connnection.release();
  //     return result.rows;
  //   } catch (err: unknown) {
  //     console.log("err");
  //     throw new Error(`err in creating Order, err: ${err as string}`);
  //   }
  // }

  // async addOrder(orderId: number, orderId: number, quantity: number): Promise<Order | void> {
  //   try {
  //     const connnection = await client.connect();
  //     const sql =
  //       "INSERT INTO orders_orders (orderId, orderId, quantity) VALUES ($1, $2, $3) RETURNING *;";
  //     const result = await connnection.query(sql, [orderId, orderId, quantity]);
  //     connnection.release();
  //     return result.rows[0];
  //   } catch (err: unknown) {
  //     console.log("err");
  //     throw new Error(`err in adding Order to an order, err: ${err as string}`);
  //   }
  // }

}
