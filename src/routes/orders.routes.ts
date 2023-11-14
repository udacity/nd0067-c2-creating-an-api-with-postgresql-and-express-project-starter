import express from 'express'
import orderControllers from '~/handler/order.controllers'
import verifyAuthToken from '~/middleware/verifyAuthToken'
const orderRouter = express.Router()

orderRouter.post('/:id/product', verifyAuthToken, orderControllers.addProductToOrder)
orderRouter.post('/', verifyAuthToken, orderControllers.createOrder)
orderRouter.get('/:id', verifyAuthToken, orderControllers.getOrder)
orderRouter.get('/:id/products', verifyAuthToken, orderControllers.getProductsFromOrder)
orderRouter.get('/', verifyAuthToken, orderControllers.getAllOrders)
orderRouter.get('/ordersByUser/:id', verifyAuthToken, orderControllers.getOrdersByUser)
orderRouter.delete('/:id', verifyAuthToken, orderControllers.deleteOrder)

export default orderRouter
