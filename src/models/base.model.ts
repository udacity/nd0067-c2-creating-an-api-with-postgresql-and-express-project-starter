import Client from "../database"



export abstract class BaseModel<T> {
    tableName: string = ''

    async index(): Promise<T[]> {
        try {
            const db = await Client.connect()
            db.connect();
            const sql = `select * from ${this.tableName};`
            const result = await db.query(sql)
            db.release()
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get ${this.tableName}`)
        }
    }

    async show(id: string): Promise<T> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id=($1)`
            
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find ${this.tableName} ${id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<T> {
        try {
      const sql = `DELETE FROM ${this.tableName} WHERE id=($1)`
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      const book = result.rows[0]
  
      conn.release()
  
      return book
        } catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`)
        }
    }

    abstract create(b: T): Promise<T>;

    abstract edit(id: number,b: T): Promise<T>;
}