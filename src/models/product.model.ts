import Client from "../database"
import { BaseModel } from "./base.model";


export type Product = {
    id: number,
    name: string,
    price: number,
    category: string,
}

export class ProductModel extends BaseModel<Product> {
    tableName: string = 'products'

    async create(p: Product): Promise<Product> {
        try {
            const sql = `INSERT INTO ${this.tableName} (name,price ,category) VALUES($1, $2, $3) RETURNING *`
            // @ts-ignore
            const db = await Client.connect()

            const result = await db.query(sql, [p.name, p.price, p.category])

            const row = result.rows[0]

            db.release()

            return row
        } catch (err) {
            throw new Error(`Could not add new ${this.tableName} ${p.name}. Error: ${err}`)
        }
    }

    async edit(id: number, p: Product): Promise<Product> {
        try {
            const sql = `UPDATE ${this.tableName} SET name = $1, category = $2, price = $3 where id = ${id} RETURNING *`
            // @ts-ignore
            const db = await Client.connect()

            const result = await db.query(sql, [p.name, p.category,  p.price])
           
            const row = result.rows[0]

            db.release()

            return row
        } catch (err) {
            throw new Error(`Could not edit ${this.tableName} with id ${id}. Error: ${err}`)
        }
    }
}