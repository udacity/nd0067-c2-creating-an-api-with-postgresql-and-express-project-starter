import Client from '../database';

export type Order = {
    id: number;
    productids: number[];
    productquantity: number[];
    userid: number;
    status: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
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
            const sql = `SELECT * FROM orders WHERE userId = ${productId} AND status = '${'active'}'`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get product ${err}`);
        }
    }
}