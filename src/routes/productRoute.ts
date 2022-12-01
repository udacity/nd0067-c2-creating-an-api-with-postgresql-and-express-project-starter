import {ProductStore} from "../models/productModel";
import express, {Request, Response} from "express";
import {authJWT} from "../handlers/handleAuth";

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
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const name = req.body.name;
        const price = req.body.price;
        if (name && price) {
            const resp = await store.create(name, price);
            res.json({msg: 'success'});
        }
    } else {
        res.json({msg: 'auth fail'});
    }
}

const productIndexRoutes = (app: express.Application) => {
    app.post('/products', create)
    app.get('/products/show', single)
    app.get('/products', index)
}

export default productIndexRoutes;