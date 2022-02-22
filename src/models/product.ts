import Client from '../database';

export type Product = {
  id: Number;
  name: string;
  price: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch(err) {
      throw new Error(`Cannot get products : ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release();
      return result.rows[0];
    } catch(err) {
      throw new Error(`Cannot get product : ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price]);
      const product = result.rows[0]
      conn.release();
      return product;
    } catch(err) {
      throw new Error(`Cannot add product : ${err}`)
    }
  }
}