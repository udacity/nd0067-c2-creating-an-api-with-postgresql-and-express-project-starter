import client from '../database'

export type Product = {
    id: Number,
    name: String,
    price: Number,
    catagory: String
}

export class ProductStore {
    async index(): Promise<Product[]> {
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
}