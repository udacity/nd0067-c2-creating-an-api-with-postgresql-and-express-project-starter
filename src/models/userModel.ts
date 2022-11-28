import Client from '../database';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserIndex {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }

    async single(productId: number): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users WHERE id = ${productId}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get user ${err}`);
        }
    }
}