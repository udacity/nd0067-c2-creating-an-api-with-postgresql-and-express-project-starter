import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import Client from './database'
import { PoolClient } from 'pg'
import {router} from './routes/index.router'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', async function (req: Request, res: Response) {
    try {
        const db = await Client.connect()
        let result = await db.query("select * from produit");
        db.release()
        console.log(await result);
    } catch (e) {
        console.log(e)
    }
    res.send('Hello World!')
})

app.use(router)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
