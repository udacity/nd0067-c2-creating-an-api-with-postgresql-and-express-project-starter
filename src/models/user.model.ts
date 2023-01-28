import Client from "../database"
import { BaseModel } from "./base.model"
import bcrypt from 'bcrypt'


export interface User  {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
}

export class UserModel extends BaseModel<User> {

    tableName: string = 'users'

    async create(u: User): Promise<User> {
        try {
            const sql = `INSERT INTO ${this.tableName} (firstname,lastname,username ,password) VALUES($1, $2, $3, $4) RETURNING *`
            // @ts-ignore
            const db = await Client.connect()

            const pepper = process.env.BCRYPT_PASSWORD
            const saltRounds = Number(process.env.SALT_ROUND)

            const hash = bcrypt.hashSync(
                u.password + pepper,
                saltRounds
            );

            const result = await db.query(sql, [u.firstname, u.lastname, u.username, hash])

            const row = result.rows[0]

            db.release()

            return row
        } catch (err) {
            throw new Error(`Could not add new ${this.tableName} ${u.firstname}. Error: ${err}`)
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



    async edit(id: number, u: User): Promise<User> {
        try {
            const sql = `UPDATE ${this.tableName} SET firstname = $1 ,lastname = $2 ,username = $3 where id = ${id} RETURNING *`
            // @ts-ignore
            const db = await Client.connect()

            const result = await db.query(sql, [u.firstname, u.lastname, u.username ])
          
            const row = result.rows[0]
            
            db.release()

            return row
        } catch (err) {
            throw new Error(`Could not edit ${this.tableName} with id ${id}. Error: ${err}`)
        }
    }
}