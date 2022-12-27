import express,{Router} from 'express'

class OrderController{

    public static index(req:express.Request,res:express.Response){
        res.sendStatus(200);
    }
}

const orderRouter:Router = Router()

orderRouter.get('/',OrderController.index);

export {
    OrderController,
    orderRouter,
};