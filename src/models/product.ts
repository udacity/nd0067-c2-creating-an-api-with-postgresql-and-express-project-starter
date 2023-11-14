import { PoolClient, QueryResult } from 'pg'
import client from '../db/database'

export interface Product {
  name: string
  price: number
  category: string
}

export interface ProductDB extends Product {
  readonly id: number
}

export class ProductStore {
  async index(): Promise<ProductDB[]> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM products;'
      const result: QueryResult = await connection.query(sql)
      const products: ProductDB[] = result.rows
      return products
    } catch (err) {
      throw new Error(`Cannot get products ${err}`)
    } finally {
      connection.release()
    }
  }

  async show(id: number): Promise<ProductDB> {
    const connection: PoolClient = await client.connect()
    try {
      const sql = 'SELECT * FROM products WHERE id=($1);'
      const sqlValues = [id]
      const result: QueryResult = await connection.query(sql, sqlValues)
      const product: ProductDB = result.rows[0]
      return product
    } catch (err) {
      throw new Error(`Could not find product with id ${id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async create(product: Product): Promise<ProductDB> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;'
      const sqlValues = [product.name, product.price, product.category]
      const result: QueryResult = await connection.query(sql, sqlValues)
      const createdProduct: ProductDB = result.rows[0]
      await connection.query('COMMIT')
      return createdProduct
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not create new product ${product.name}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async update(product_id: number, product: Product): Promise<ProductDB> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')
      const sql = 'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *;'
      const sqlValues = [product.name, product.price, product.category, product_id]
      const result: QueryResult = await connection.query(sql, sqlValues)
      const updatedProduct: ProductDB = result.rows[0]
      await connection.query('COMMIT')
      return updatedProduct
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not update product ${product.name}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }

  async delete(id: number): Promise<ProductDB> {
    const connection: PoolClient = await client.connect()
    try {
      await connection.query('BEGIN')
      const sql = 'DELETE FROM products WHERE id=($1);'
      const sqlValues = [id]
      const result: QueryResult = await connection.query(sql, sqlValues)
      const deletedProduct: ProductDB = result.rows[0]
      await connection.query('COMMIT')
      return deletedProduct
    } catch (err) {
      await connection.query('ROLLBACK')
      throw new Error(`Could not delete product with id ${id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }
}
