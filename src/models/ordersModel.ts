import Client from '../database';

export type Order = {
    id: number;
    products: orderProduct[];
    userid: number;
    status: string;
}

export type orderProduct = {
    productid: number, quantity: number
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

    async single(productId: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const orderInfo = `SELECT * FROM orders WHERE userId = ${productId} AND status = '${'active'}'`;
            const orderResult = await conn.query(orderInfo);
            const orderHeaders = orderResult.rows[0];

            const orderId = orderHeaders['id'];

            const productInfo = `SELECT productid, quantity FROM orders INNER JOIN order_products ON orders.id = ${orderId}`;
            const productResults = await conn.query(productInfo);
            const products = productResults.rows;
            conn.release();

            return {
                id: orderHeaders.id,
                products: products as unknown as orderProduct[],
                userid: orderId,
                status: 'active'
            };
        } catch (err) {
            throw new Error(`Cannot get product ${err}`);
        }
    }
}