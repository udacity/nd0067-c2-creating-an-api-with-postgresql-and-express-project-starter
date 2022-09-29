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

}
