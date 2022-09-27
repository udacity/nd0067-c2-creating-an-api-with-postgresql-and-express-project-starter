import client from "../db/db";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM products;";
      const result = await connnection.query(sql);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log(err);
      throw new Error(`err in fetching all products, err: ${err as string}`);
    }
  }

  async show(id: string): Promise<Product | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM products WHERE id=$1;";
      const result = await connnection.query(sql, [id]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching product with id ${id}, err: ${err as string}`
      );
    }
  }

  async create(product: Product): Promise<Product | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING *;";
      const result = await connnection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating product, err: ${err as string}`);
    }
  }

  // [Extra] dangerous (ON DELETE CASCADE)
  async delete(productId: string): Promise<Product[] | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "DELETE FROM products where id=$1;";
      const result = await connnection.query(sql, [productId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating product, err: ${err as string}`);
    }
  }

  //[Optional] 
  async fetchByCategory(category: string): Promise<Product[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM products WHERE category=$1;";
      const result = await connnection.query(sql, [category]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in fetching products by category, err: ${err as string}`);
    }
  }
  //limit products fetch by certain number
  //needs order in process
//   async fetchMostPopularByNumber(numberLimit: number): Promise<Product[] | void> {
//     try {
//       const connnection = await client.connect();
//       const sql = "SELECT * FROM products WHERE category=$1;";
//       const result = await connnection.query(sql, [numberLimit]);
//       connnection.release();
//       return result.rows[0];
//     } catch (err) {
//       console.log("err");
//       throw new Error(`err in fetching products by category, err: ${err as string}`);
//     }
//   }
}
