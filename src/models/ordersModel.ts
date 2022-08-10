import { Connection } from "pg"
import client from "../database"

export type Order = {
    id?: number,
    order_id: number,
    product_id: number,
    quantity: number,
    user_id: number,
}

export class OrderStore {
    async showOrder(id: number): Promise<Order[]> {
    try {
        const sql = `SELECT * FROM orders_table WHERE order_id=($1)`
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get order. ${err}`)
    }
}
    async createOrder(order: Order): Promise<Order[]> {
        try {
            const sql = `INSERT INTO orders_table (order_id, product_id, quantity, user_id) VALUES
            ($1, (SELECT id FROM products_table WHERE product_id=($2)), $3, (SELECT id FROM users_table WHERE user_id=($4))) RETURNING *`
            const conn = await client.connect()
            const result = await conn.query(sql, [order.order_id, order.product_id, order.quantity, order.user_id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not create Order. ${err}`)
        }
    }

    async showOrderByUser(id: number): Promise<Order[]> {
        try {
            const sql = `SELECT * FROM orders_table WHERE user_id=($1)`
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not retrieve order(s). ${err}`)
        }
    }

    async showOrderByProduct(id: number): Promise<Order[]> {
        try {
            const sql = `SELECT * FROM orders_table WHERE product_id=($1)`
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not retrieve order. ${err}`)
        }
    }

    async truncateOrder():Promise<Order[]> {
        try {
            const sql = `TRUNCATE orders_table RESTART IDENTITY CASCADE`
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not truncate table. ${err}`)
        }
    }
}