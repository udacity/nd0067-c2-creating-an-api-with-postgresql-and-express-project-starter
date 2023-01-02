import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class MyProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await client.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('Can not get Products ${err}');
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=$1';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(b: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [b.name, b.price, b.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new Product . Error: ${err}`);
    }
  }
  async filter(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products where category = '" + category + "'";
      const result = await client.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('Can not get Products ${err}');
    }
  }
}
