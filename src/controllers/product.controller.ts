import express,{Router} from 'express'
import { Product, ProductModel } from '../models/product.model';
class ProductController{

    public static async index(req:express.Request,res:express.Response){
        const model:ProductModel = new ProductModel
        let products = await model.index()

        res.status(200).json(products);
    }

    public static async create(req:express.Request,res:express.Response){
        const model:ProductModel = new ProductModel
        
        try{
            if(req.body.name!= undefined && req.body.category != undefined){
                let product:Product = {
                    id: 0,
                    name: req.body.name,
                    category: req.body.category,
                    price: Number(req.body.price)
                }
                product = await model.create(product);
                res.status(200).json(product);
            }else{
                res.status(500).send('Name and Category must not be null');
            }
            
        }catch(err){
            res.status(500).send(err);
        }
        
    }

    public static async show(req:express.Request,res:express.Response){
        const model:ProductModel = new ProductModel
       
        try{
            if(req.params.id != undefined){
                let product = await model.show(req.params.id);
                res.status(200).json(product)
            }else{
                res.status(500).send('Id of the product required')
            }
            
        }catch(err){
            res.status(500).send(err);
        }
    }

    public static async update(req:express.Request,res:express.Response){
        const model:ProductModel = new ProductModel
        console.log(req.params)
        try{
            
            if(req.params.id != undefined && req.body.name != undefined && req.body.price != undefined){
                console.log(req.body)
                let product = await model.edit(Number(req.params.id as string),{
                    id: 0,
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                });
                res.status(200).json(product)
            }else{
                res.status(500).send('Id of the product required')
            }
            
        }catch(err){
            res.status(500).send(err);
        }
    }

    
}

const productRouter:Router = Router()

productRouter.get('/',ProductController.index);
productRouter.post('/',ProductController.create);
productRouter.get('/:id',ProductController.show);
productRouter.put('/:id',ProductController.update);

export {
    ProductController,
    productRouter,
};