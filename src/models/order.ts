import { User } from './user'
import { PoolClient } from 'pg'
import client from '../db/database'
import { ProductDB } from './product'

export interface Order {
  status: string
  user_id: number
}

export interface OrderDB extends Order {
  readonly id: number
}

export interface OrderProduct {
  quantity: number
  product_id: number
}

export interface OrderProductDB extends OrderProduct {
  readonly id: number
  order_id: number
}

export interface DeletedOrder {
  deletedProducts: OrderProductDB[]
  deletedOrder: OrderDB
}

export class OrderStore {
  async createOrder(user_id: number, products: OrderProduct[]): Promise<OrderProductDB[]> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')

      const userSQL = 'SELECT * from users where id=($1);'
      const user: User = (await connection.query(userSQL, [user_id])).rows[0]

      if (!user) {
        throw new Error(`Could not find user with id: ${user_id}`)
      }

      const createOrderSQL = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;'
      const order: OrderDB = (await connection.query(createOrderSQL, ['active', user_id])).rows[0]

      if (!order) {
        throw new Error('Could not create new order')
      }

      const addProductSQL =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;'

      const productPromises = products.map(async (product: OrderProduct): Promise<OrderProductDB> => {
        const sqlProductValues = [product.quantity, order.id, product.product_id]
        const createdOrderProduct: OrderProductDB = (await connection.query(addProductSQL, sqlProductValues)).rows[0]

        if (!createdOrderProduct) {
          throw new Error('Could not add product to order')
        }
        return createdOrderProduct
      })

      const addedProducts: OrderProductDB[] = await Promise.all(productPromises)

      await connection.query('COMMIT')
      return addedProducts
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not create order for user: ${user_id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async getAllOrders(): Promise<OrderDB[]> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM orders;'
      const orders: OrderDB[] = (await connection.query(sql)).rows
      return orders
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async getOrder(order_id: number): Promise<OrderDB> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1);'
      const order: OrderDB = (await connection.query(sql, [order_id])).rows[0]
      return order
    } catch (err) {
      throw new Error(`Could not get order with id: ${order_id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async getProductsFromOrder(order_id: number): Promise<ProductDB[]> {
    const connection: PoolClient = await client.connect()
    try {
      const sql =
        'SELECT p.id, name, price, category FROM products p INNER JOIN order_products o ON p.id=o.product_id WHERE o.order_id=($1);'
      const products: ProductDB[] = (await connection.query(sql, [order_id])).rows
      return products
    } catch (err) {
      throw new Error(`Could not get products for order: ${order_id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async getOrdersByUser(user_id: number): Promise<OrderDB[]> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1);'
      const orders: OrderDB[] = (await connection.query(sql, [user_id])).rows
      return orders
    } catch (err) {
      throw new Error(`Could not get orders for user: ${user_id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async addProductToOrder(order_id: number, orderProduct: OrderProduct): Promise<OrderProductDB> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')
      const orderSQL = 'SELECT * FROM orders WHERE id=($1);'
      const order: OrderDB = (await connection.query(orderSQL, [order_id])).rows[0]

      if (!order) {
        throw new Error('Order does not exist, you may have to create it first')
      }

      if (order.status !== 'active') {
        throw new Error(`Order has status ${order.status}, can not add new products anymore`)
      }

      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;'
      const sqlValues = [orderProduct.quantity, order_id, orderProduct.product_id]
      const createdOrderProduct: OrderProductDB = (await connection.query(sql, sqlValues)).rows[0]
      await connection.query('COMMIT')
      return createdOrderProduct
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not add product ${orderProduct.product_id} to order ${order_id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async deleteOrder(order_id: number): Promise<DeletedOrder> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')
      const orderSQL = 'SELECT * FROM orders WHERE id=($1);'
      const order: OrderDB = (await connection.query(orderSQL, [order_id])).rows[0]

      if (!order) {
        throw new Error('Order does not exist, you may have to create it first')
      }

      if (order.status !== 'active') {
        throw new Error(`Order has status ${order.status}, can not delete order anymore`)
      }

      const deleteProductsFromOrdersSQL = 'DELETE FROM order_products WHERE order_id=($1) RETURNING *;'
      const deleteOrderSQL = 'DELETE FROM orders WHERE id=($1) RETURNING *;'
      const deletedProducts: OrderProductDB[] = (await connection.query(deleteProductsFromOrdersSQL, [order_id])).rows
      const deletedOrder: OrderDB = (await connection.query(deleteOrderSQL, [order_id])).rows[0]
      await connection.query('COMMIT')
      return {
        deletedProducts,
        deletedOrder
      }
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not delete order ${order_id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }
}
