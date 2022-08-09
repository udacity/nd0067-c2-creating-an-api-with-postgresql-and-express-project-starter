import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'express'
import createProductRouter from './routes/products'
import createOrderRouter from './routes/orders'
import createUserRouter from './routes/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())

createProductRouter(app)
createUserRouter(app)
createOrderRouter(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
