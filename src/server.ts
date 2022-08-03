import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import createProductRouter from './routes/products'
import createOrderRouter from './routes/orders'
import createUserRouter from './routes/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

createProductRouter(app)
createUserRouter(app)
createOrderRouter(app)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
