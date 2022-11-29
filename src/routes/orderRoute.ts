import express, {Request, Response} from "express";
import {OrderStore} from "../models/ordersModel";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    await res.json(products);
}

const single = async (req: Request, res: Response) => {
    const productId: number = parseInt(<string>req.query.id);
    const product = await store.single(productId);
    await res.json(product);
}

const orderIndexRoutes = (app: express.Application) => {
    // app.post('/products', create)
    app.get('/products/show', single)
    app.get('/products', index)


}

export default orderIndexRoutes;