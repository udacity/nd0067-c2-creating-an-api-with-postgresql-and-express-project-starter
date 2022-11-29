import Client from '../database';

export type Order = {
    id: number;
    productIds: number[];
    productQuantity: number[];
    userId: number;
    status: orderStatus;
}

enum orderStatus {
    active,
    complete
}

export class OrderStore {
    async index(): Promise<Order[]> {
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

    async single(productId: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders WHERE id = ${productId}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get product ${err}`);
        }
    }

    async create(productIds: number[], productQuantity: number[], userId: number, status: orderStatus):  Promise<any[]> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO orders (productIds, productQuantity, userId, status) VALUES ('${productIds}', '${productQuantity}', '${userId}', '${status}')`;
            const results = await conn.query(sql);
            console.log(`---> create sql response ${JSON.stringify(results)}`);
            return results.rows;
        } catch (err) {
            throw new Error(`Cannot create product ${err}`);
        }
    }
}