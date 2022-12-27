import express from 'express'
import { dashboardRouter } from '../controllers/dashboard.controller'
import { orderRouter } from '../controllers/order.controller'
import {productRouter} from '../controllers/product.controller'
import { userRouter } from '../controllers/user.controller'

const router:express.Router = express.Router()

router.use('/products',productRouter)
router.use('/users',userRouter)
router.use('/orders',orderRouter)
router.use('/dashboard',dashboardRouter)

export {router}
