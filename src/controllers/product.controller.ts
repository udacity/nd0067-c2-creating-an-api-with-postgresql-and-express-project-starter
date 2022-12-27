import express,{Router} from 'express'

class ProductController{

    public static index(req:express.Request,res:express.Response){
        res.sendStatus(200);
    }
}

const productRouter:Router = Router()

productRouter.get('/',ProductController.index);

export {
    ProductController,
    productRouter,
};