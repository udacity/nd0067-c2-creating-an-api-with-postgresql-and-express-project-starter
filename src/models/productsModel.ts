
import client from '../database'

export type Product = {
    id?: Number,
    name: String,
    price: Number,
    category: String
}

export class ProductStore {
    async showCatalog(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products_table'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
    } catch (err) {
        throw new Error(`Cannot get products: ${err}`)
    }
}
    async showProduct(id: Number): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products_table WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot find product ${id}. ${err}`)
        }
    }

    async createProduct(p: Product): Promise<Product[]> {
        try {
            const sql = 'INSERT INTO products_table (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [p.name, p.price, p.category])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot create product ${p.name}. ${err}`)
        }
    }

    async deleteProduct(id: Number): Promise<Product[]> {
        try {
            const sql = 'DELETE FROM products_table WHERE id=($1) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot delete product ${id}. ${err}`)
        }
    }
}