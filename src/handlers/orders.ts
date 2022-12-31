import express, {Request, Response} from 'express';
import {Order, MyOrderStore} from '../models/order';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//const tokenSecret = process.env.TOKEN_SECRET;

const store= new MyOrderStore();

const index = async(_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async(req: Request, res: Response) => {
    try{
        const orders = await store.show(req.params.id);
        res.json(orders);
    }catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async(req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
            status: req.body.status,
            userId: req.body.user_id
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
    
}


const addProduct = async(req: Request, res: Response) => {
    try {
        const newOrderProduct = await store.addProduct(req.body.quantity, req.body.order_id, req.body.product_id);
        res.json(newOrderProduct);
    } catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const currentUserOrder = async(req: Request, res: Response) => {
    try{
        const orders = await store.currentUserOrder(req.params.id);
        res.json(orders);
    }catch(err) {
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



const myorder_routes = (app: express.Application)=> {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.post('/orders/:id/products', addProduct)
    app.get('/orderByUser/:id', verifyAuthToken, currentUserOrder)
}
export default myorder_routes;