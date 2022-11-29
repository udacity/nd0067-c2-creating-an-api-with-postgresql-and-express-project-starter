import {ProductStore} from "../models/productModel";
import express, {Request, Response} from "express";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    await res.json(products);
}

const single = async (req: Request, res: Response) => {
    const productId: number = parseInt(<string>req.query.id);
    const product = await store.single(productId);
    await res.json(product);
}

const create = async (req: Request, res: Response) => {
    const name = req.body.name;
    const price = req.body.price;
    if (name && price) {
       const resp = await store.create(name, price);
       console.log(`----> this is the resp ${resp}`);
       res.json(resp);
    }
}

const productIndexRoutes = (app: express.Application) => {
    app.post('/products', create)
    app.get('/products/show', single)
    app.get('/products', index)
}

export default productIndexRoutes;