import express from 'express'
import cors from 'cors'
import userRouter from './routes/users.routes'
import bodyParser from 'body-parser'
import productRouter from './routes/products.routes'
import orderRouter from './routes/orders.routes'
const app: express.Application = express()

/**
 * init middlewares
 */
app.use(cors())
app.use(bodyParser.json())
/**
 * users routes
 */
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)

/**
 * handling error
 */

export default app
