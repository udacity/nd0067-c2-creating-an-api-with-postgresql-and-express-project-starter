import {ProductIndex} from "../models/productModel";
import express, {Request, Response} from "express";

const store = new ProductIndex();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    await res.json(products);
}

const productIndexRoutes = (app: express.Application) => {
    app.get('/products', index)
}

export default productIndexRoutes;