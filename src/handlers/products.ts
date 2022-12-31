import express, {Request, Response} from 'express';
import {Product, MyProductStore} from '../models/product';
import jwt from 'jsonwebtoken';

const store= new MyProductStore();

const index = async(_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async(req: Request, res: Response) => {
    try{
        console.log(req.params.id);
        const products = await store.show(req.params.id);
        res.json(products);
    }catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async(req: Request, res: Response) => {
    try {
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
    
}
const filter = async(req: Request, res: Response) => {
    try {
        const products = await store.filter(req.params.category);
        res.json(products);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        console.log(process.env.TOKEN_SECRET);
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader){
            const token = authorizationHeader.split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as string);
            next();
        }else{
            res.status(401);
        res.json('No token ');
        }
    } catch (error) {
        res.status(401);
        res.json('Invalid token ${error}');
        return;
    }
}

const myproduct_routes = (app: express.Application)=> {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.get('/productsPerCategory/:category', filter)
}
export default myproduct_routes;