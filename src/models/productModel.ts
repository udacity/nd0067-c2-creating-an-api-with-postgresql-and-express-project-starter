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

    async create(name: string, price: number):  Promise<number> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products (name, price) VALUES ('${name}', '${price}')`;
            const results = await conn.query(sql);
            console.log(`---> create sql response ${JSON.stringify(results.rowCount)}`);
            return results.rowCount;
        } catch (err) {
            throw new Error(`Cannot create product ${err}`);
        }
    }
}