import Client from '../database';

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async single(productId: number): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products WHERE id = ${productId}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get product ${err}`);
        }
    }

    async create({name, price}: {name: string, price: number}):  Promise<any[]> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products VALES (firstName: '${name}', price: '${price}')`;
            const results = await conn.query(sql);
            return results.rows;
        } catch (err) {
            throw new Error(`Cannot create product ${err}`);
        }
    }
}