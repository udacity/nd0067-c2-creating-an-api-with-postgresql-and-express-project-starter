import client from "../db/db";

//the requirements.md file asked for a model/table so I created a model for the joined table
export type ProductsOrdersType = {
  id?: number;
  productId: number;
  orderId: number;
  quantity: number;
};

export class OrdersProductsModel {
  async create({
    productId,
    orderId,
    quantity,
  }: ProductsOrdersType): Promise<ProductsOrdersType | void> {
    try {
      const connnection = await client.connect(); const sql =
        "INSERT INTO orders_products(orderId, productId, quantity) VALUES ($1, $2, $3) RETURNING *;";
      const result = await connnection.query(sql, [
        orderId,
        productId,
        quantity,
      ]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in adding product to order, err: ${err as string}`);
    }
  }

  //   async index(): Promise<Product[] | void> {
  //     try {
  //       const connnection = await client.connect();
  //       const sql = "SELECT * FROM products;";
  //       const result = await connnection.query(sql);
  //       connnection.release();
  //       return result.rows;
  //     } catch (err: unknown) {
  //       console.log(err);
  //       throw new Error(`err in fetching all products, err: ${err as string}`);
  //     }
  //   }

  //   async show(id: string): Promise<Product | void> {
  //     try {
  //       const connnection = await client.connect();
  //       const sql = "SELECT * FROM products WHERE id=$1;";
  //       const result = await connnection.query(sql, [id]);
  //       connnection.release();
  //       return result.rows[0];
  //     } catch (err: unknown) {
  //       console.log("err");
  //       throw new Error(
  //         `err in fetching product with id ${id}, err: ${err as string}`
  //       );
  //     }
  //   }

  // [Extra] dangerous (ON DELETE CASCADE)
  //   async delete(productId: string): Promise<Product[] | void> {
  //     try {
  //       const connnection = await client.connect();
  //       const sql =
  //         "DELETE FROM products where id=$1;";
  //       const result = await connnection.query(sql, [productId]);
  //       connnection.release();
  //       return result.rows;
  //     } catch (err: unknown) {
  //       console.log("err");
  //       throw new Error(`err in creating product, err: ${err as string}`);
  //     }
  //   }
}
