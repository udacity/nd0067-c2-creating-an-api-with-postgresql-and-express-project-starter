import express from 'express'
import productControllers from '~/handler/product.controllers'
import verifyAuthToken from '~/middleware/verifyAuthToken'
const productRouter = express.Router()

productRouter.get('/', productControllers.getAllProducts)
productRouter.get('/:id', productControllers.getProduct)
productRouter.put('/:id', verifyAuthToken, productControllers.updateProduct)
productRouter.post('/', verifyAuthToken, productControllers.addProduct)
productRouter.delete('/:id', verifyAuthToken, productControllers.deleteProduct)

export default productRouter
