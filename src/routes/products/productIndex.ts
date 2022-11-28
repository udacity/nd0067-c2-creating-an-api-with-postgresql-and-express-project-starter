import {ProductStore} from "../../models/productModel";
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

const create = async (_req: Request, res: Response) => {
    console.log('hey this is the create method');
}

const productIndexRoutes = (app: express.Application) => {
    app.post('/products', create)
    app.get('/products/show', single)
    app.get('/products', index)


}

export default productIndexRoutes;