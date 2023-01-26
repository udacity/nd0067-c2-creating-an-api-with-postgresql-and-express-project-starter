import express,{Router} from 'express'
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { OrderModel, OrderStatus } from '../models/order.model';

class OrderController{

    public static index(req:express.Request,res:express.Response){
        res.sendStatus(200);
    }

    public static async create(req:express.Request,res:express.Response){
        try{
            if(req.body.user!==undefined && req.body.product_id !== undefined && req.body.quantity !== undefined  ){
                const order:OrderModel = new OrderModel
                
                const new_order = await order.create({
                    id: 0,
                    user_id: Number(req.body.user.id),
                    product_id: Number(req.body.product_id),
                    quantity: Number(req.body.quantity),
                    status: OrderStatus.ACTIVE,
                })                
                res.status(200).json(new_order)

            }else{
                res.status(500).send("User, Product and Quantity Required") 
            }
        }catch(err){
            console.log('Error ',err)
            res.status(500).send(String(err))
        }
    }

    public static async currentsByUser(req:express.Request,res:express.Response){
        const user_id:number = Number(req.params.user_id)
        try{
            if(user_id >0 ){
                const order:OrderModel = new OrderModel
                const orders = await order.currentOrdersByUser(user_id)
                res.status(200).json(orders)

            }else{
                res.status(500).send("User ID Required") 
            }
        }catch(err){
            console.log('Error ',err)
            res.status(500).send(String(err))
        }
    }

    public static async completedsByUser(req:express.Request,res:express.Response){
        const user_id:number = Number(req.params.user_id)
        try{
            if(user_id >0 ){
                const order:OrderModel = new OrderModel
                const orders = await order.completedOrdersByUser(user_id)
                res.status(200).json(orders)

            }else{
                res.status(500).send("User ID Required") 
            }
        }catch(err){
            console.log('Error ',err)
            res.status(500).send(String(err))
        }
    }
}

const orderRouter:Router = Router()

orderRouter.get('/',OrderController.index);
orderRouter.post('/',AuthMiddleware,OrderController.create);
orderRouter.get('/currents_by_user/:user_id',AuthMiddleware,OrderController.currentsByUser);
orderRouter.get('/completeds_by_user/:user_id',AuthMiddleware,OrderController.completedsByUser);

export {
    OrderController,
    orderRouter,
};