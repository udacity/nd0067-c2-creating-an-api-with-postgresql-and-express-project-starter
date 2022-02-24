import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import { verifyAuthToken } from '../middlewares/auth';
import { json } from 'body-parser';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch(e) {
    res.status(500).json(e)
  }
}

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json("Please fill an integer as ID");
    return
  }
   try {
    const product = await store.show(id)
    res.json(product)  
   } catch(e) {
    res.status(500).json(e)
   }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: 0,
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes;