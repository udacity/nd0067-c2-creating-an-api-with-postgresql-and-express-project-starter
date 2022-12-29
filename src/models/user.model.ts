import Client from "../database"
import { BaseModel } from "./base.model";


export type User = {
    id: number,
    firstName: string,
    lastName: string,
    password: string,
}

export class UserModel extends BaseModel<User> {
    
    tableName: string = 'users'

    async create(p: User): Promise<User> {
        try {
            const sql = `INSERT INTO ${this.tableName} (firstName,lastName ,password) VALUES($1, $2, $3) RETURNING *`
        
            const db = await Client.connect()

            const result = await db.query(sql, [p.firstName,p.lastName,p.password])

            const row = result.rows[0]

            db.release()

            return row
        } catch (err) {
            throw new Error(`Could not add new ${this.tableName} ${p.firstName}. Error: ${err}`)
        }
    }

    edit(id: number, b: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}