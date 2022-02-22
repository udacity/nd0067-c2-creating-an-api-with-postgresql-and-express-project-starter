import Client from '../database';
import { Product } from './product';
import { User } from './user';

export type Order = {
  id: number;
  products: Object;
  user: User;
  completed: boolean;
}

export class OrderStore {
  async current(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 
        "SELECT * from orders INNER JOIN order_product ON (orders.id = order_product.order_id) WHERE completed = false AND user_id = ($1);"
      const result = await conn.query(sql, [id]);
      let orders: Order[] = [];
      conn.release();
      result.rows.forEach(row => {
        let orderExist = orders.filter(order => order.id === row.id)[0];
        if (orderExist) {
          orders[orders.indexOf(orderExist)] = {
            ...orderExist,
            products: {
              ...orderExist.products,
              [row.product_id]: row.quantity
            }
          }
        } else {
          orders.push({
            id: row.id,
            user: row.user_id,
            completed: false,
            products: {
              [row.product_id]: row.quantity
            }
          })
        }
      });
      return orders;
    } catch(err) {
      throw new Error(`Cannot get user's orders : ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *;'
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user]);
      const id = result.rows[0].id;
      await Promise.all(Object.entries(o.products).map(async ([product, quantity]) => {
        await conn.query(
          "INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3);",
          [id, product, quantity]
        );
      }));
      conn.release();
      return {...o, id};
    } catch(err) {
      throw new Error(`Cannot create order : ${err}`);
    }
  }
}