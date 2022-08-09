import { Connection } from "pg"
import client from "../database"

export type Order = {
    id?: number,
    product_id: number,
    qty: number,
    user_id: number,
    status: string
}

export class OrderStore {
    async showOrder(id: number): Promise<Order[]> {
    try {
        const sql = `SELECT * FROM orders_table WHERE id=${id}`
        const conn = await client.connect()
        const result = await conn.query(sql)
        conn.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get order. ${err}`)
    }
}
    async createOrder(order: Order): Promise<Order[]> {
        try {
            const sql = `INSERT INTO orders_table (product_id, qty, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *`
            const conn = await client.connect()
            const result = await conn.query(sql, [order.product_id, order.qty, order.user_id, order.status])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not create Order. ${err}`)
        }
    }

    async showOrderByUser(id: number): Promise<Order[]> {
        try {
            const sql = `SELECT * FROM orders_table WHERE user_id=${id}`
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
            const sql = `SELECT * FROM orders_table WHERE product_id=${id}`
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not retrieve order. ${err}`)
        }
    }
}