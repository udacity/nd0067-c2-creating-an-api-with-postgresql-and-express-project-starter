import Client from '../database';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
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

    async login(firstName: string, lastName: string, password: string): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users WHERE firstName = '${firstName}' AND lastName = '${lastName}' AND password = '${password}'`;

            const result = await conn.query(sql);
            conn.release();
            if (result.rows) {
                return 'true';
            } else {
                return 'false';
            }
        } catch (err) {
            throw new Error(`Cannot get user ${err}`);
        }
    }

    async create(firstName: string, lastName: string, password: string):  Promise<any[]> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO users (firstName, lastName, password) VALUES ('${firstName}', '${lastName}', '${password}')`;
            const results = await conn.query(sql);
            console.log(`---> create sql response ${JSON.stringify(results)}`);
            return results.rows;
        } catch (err) {
            throw new Error(`Cannot create product ${err}`);
        }
    }
}