import {ProductIndex} from "../../models/productModel";
import express, {Request, Response} from "express";

const store = new ProductIndex();

const single = async (req: Request, res: Response) => {
    const productId: number = parseInt(<string>req.query.id);
    const product = await store.single(productId);
    await res.json(product);
}

const productSingleRoutes = (app: express.Application) => {
    app.get('/show', single)
}

export default productSingleRoutes;