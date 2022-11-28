import {ProductIndex} from "../models/productModel";
import express, {Request, Response} from "express";

const store = new ProductIndex();

const single = async (_req: Request, res: Response) => {
    const product = await store.single();
    await res.json(product);
}

const productSingleRoutes = (app: express.Application) => {
    app.get('/product', single)
}

export default productSingleRoutes;