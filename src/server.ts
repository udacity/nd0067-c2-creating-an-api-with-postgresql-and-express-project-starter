import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { router } from './routes/index.router'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: express.Application = express()
let port:string = process.env.NODE_ENV === 'TEST' ? '3001' : '3000'
const address: string = "0.0.0.0:"+port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.use(router)

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})

export default app
