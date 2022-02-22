import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middlewares/auth';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  const user: User = {
      id: undefined,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
  }
  try {
      const newUser = await store.create(user)
      var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
      res.json(token)
  } catch(err) {
      res.status(400).json(err)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    id: undefined,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  }
  if (!(user.firstname && user.lastname && user.password)) {
    res.status(400).json("Please, give all needed informations")
    return;
  }
  try {
      const u = await store.authenticate(user.firstname, user.lastname, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.json(token)
  } catch(error) {
      res.status(401).json({ error })
  }
}

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json("Please fill an integer as ID");
    return
  }
   const user = await store.show(id)
   res.json(user)
}

const userRoutes = (app: express.Application) => {
  app.post('/signin', authenticate),
  app.post('/signup', create),
  app.get('/users', verifyAuthToken, index),
  app.get('/users/:id', verifyAuthToken, show)
}

export default userRoutes;