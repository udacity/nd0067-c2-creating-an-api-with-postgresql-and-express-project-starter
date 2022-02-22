import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'

export const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader === undefined) {
        throw new Error("Please give JWT into Headers");
      } else {
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
      }
      
  } catch (error) {
      res.status(401).json("Check credentials")
      return;
  }
}