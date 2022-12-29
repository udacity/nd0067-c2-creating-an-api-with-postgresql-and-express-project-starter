import Client from "../database"
import { BaseModel } from "./base.model"
import bcrypt from 'bcrypt'


export type User = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}

export class UserModel extends BaseModel<User> {

    tableName: string = 'users'

    async create(u: User): Promise<User> {
        try {
            const sql = `INSERT INTO ${this.tableName} (firstName,lastName,username ,password) VALUES($1, $2, $3, $4) RETURNING *`
            // @ts-ignore
            const db = await Client.connect()

            const pepper = process.env.BCRYPT_PASSWORD
            const saltRounds = Number(process.env.SALT_ROUND)

            const hash = bcrypt.hashSync(
                u.password + pepper,
                saltRounds
            );

            const result = await db.query(sql, [u.firstName, u.lastName, u.username, hash])

            const row = result.rows[0]

            db.release()

            return row
        } catch (err) {
            throw new Error(`Could not add new ${this.tableName} ${u.firstName}. Error: ${err}`)
        }
    }

    async attempt(username: string, password: string): Promise<User | string> {
        try {
            const sql = `select * from ${this.tableName} where username = $1`
            // @ts-ignore
            const db = await Client.connect()
            const result = await db.query(sql, [username])

            const user: User = result.rows[0]

            const pepper = process.env.BCRYPT_PASSWORD
            const saltRounds = Number(process.env.SALT_ROUND)



            db.release()

            if (bcrypt.compareSync(
                password + pepper,
                user.password
            )) {
                return user
            } else {
                return ''
            }
        } catch (err) {
            throw new Error(`Could not find ${this.tableName} ${username}. Error: ${err}`)
        }
    }



    edit(id: number, b: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}