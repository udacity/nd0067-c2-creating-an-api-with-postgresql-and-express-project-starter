import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  const user: User = {
      id: undefined,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
  }
  try {
      const newUser = await store.create(user)
      var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
      res.json(token)
  } catch(err) {
      res.status(400)
      res.json(err + user)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    id: undefined,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  }
  try {
      const u = await store.authenticate(user.firstname, user.lastname, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}

const userRoutes = (app: express.Application) => {
  app.post('/signin', authenticate)
  app.post('/signup', create)
}

export default userRoutes;