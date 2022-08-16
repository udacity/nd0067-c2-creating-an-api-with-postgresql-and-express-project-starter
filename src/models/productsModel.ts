
import client from '../database'

export type Product = {
    ProductID: number | undefined,
    name: string,
    price: number,
    category: string
}

export class ProductStore {
    async showCatalog(): Promise<Product[]> {
        try {
            const sql: string = 'SELECT * FROM products_table'
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
    } catch (err) {
        throw new Error(`Cannot get products: ${err}`)
    }
}
    async showProduct(id: number): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products_table WHERE ProductID=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot find product ${id}. ${err}`)
        }
    }

    async createProduct(newProduct: Product): Promise<Product[]> {
        try {
            let sql = ''
            const conn = await client.connect()
            if (newProduct.name && newProduct.price && newProduct.category) {
                sql = 'INSERT INTO products_table (name, price, category) VALUES ($1, $2, $3) RETURNING *' 
            }
            const result = await conn.query(sql, [newProduct.name, newProduct.price, newProduct.category])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot create product ${newProduct.name}. ${err}`)
        }
    }

    async truncateProduct(): Promise<Product[]> {
        try {
            const sql = `TRUNCATE products_table RESTART IDENTITY CASCADE`
            const conn = await client.connect()
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot truncate table. ${err}`)
        }
    }

    async deleteProduct(id: number): Promise<Product[]> {
        try {
            const sql = `DELETE FROM products_table WHERE ProductID=$1 RETURNING *`
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error (`Could not delete product. ${err}`)
        }
    }

    async showProductByCat(cat: string): Promise<Product[]> {
        try {
            const sql = `SELECT * FROM products_table WHERE category=$1`
            const conn = await client.connect()
            const result = await conn.query(sql, [cat])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not get products. ${err}`)
        }
    }
}