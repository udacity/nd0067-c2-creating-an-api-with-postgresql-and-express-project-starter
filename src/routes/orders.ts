import {Router, Request, Response} from 'express'
import { Order, OrderStore } from '../models/ordersModel'
import verifyToken from '../lib/auth'

const orderInstance = new OrderStore

const createOrderRouter = (app: Router) => {
    const orderRoute: Router = Router()
    app.use('/orders', orderRoute)

    orderRoute.get('/:id', async (req: Request, res: Response) => {
        const orderID = parseInt(req.params.id)
        const orderQuery = await orderInstance.showOrder(orderID)
        res.json(orderQuery)
})
    orderRoute.get('/product/:id', async (req: Request, res: Response) => {
        const productID = parseInt(req.params.id)
        const orderQuery = await orderInstance.showOrderByProduct(productID)
        res.json(orderQuery)
    })

    orderRoute.get('/user/:id', async (req: Request, res: Response) => {
        const userID = parseInt(req.params.id)
        const orderQuery = await orderInstance.showOrderByUser(userID)
        res.json(orderQuery)
    })

    orderRoute.post('/', async (req: Request, res: Response) => {
        const orderQuery: Order[] = await orderInstance.createOrder(req.body)
        res.json(orderQuery)
    })
    
    orderRoute.delete('/truncate/', async (req: Request, res: Response) => {
        const deleted = await orderInstance.truncateOrder()
        res.json(deleted)
    })
}

export default createOrderRouter
