import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {router} from './routes/index.router'
import cors from 'cors'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.use(router)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
