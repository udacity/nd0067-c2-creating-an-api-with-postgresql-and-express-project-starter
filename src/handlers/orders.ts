import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../middlewares/auth';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
      const order: Order = {
          id: 0,
          user: req.body.user,
          completed: false,
          products: req.body.products as Map<number, number>
      }
      const newOrder = await store.create(order)
      res.json(newOrder)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const current = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const orders = await store.current(userId, false);
    res.json(orders);
  } catch(err) {
    res.status(500).json(err);
  }
}

const completed = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const orders = await store.current(userId, true);
    res.json(orders);
  } catch(err) {
    res.status(500).json(err);
  }
}

const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create)
  app.get('/orders/:id/active', verifyAuthToken, current)
  app.get('/orders/:id/completed', verifyAuthToken, completed)
}

export default orderRoutes;