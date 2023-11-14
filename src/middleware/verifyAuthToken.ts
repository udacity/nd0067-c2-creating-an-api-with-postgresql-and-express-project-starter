import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { TOKEN_SECRET } = process.env

if (!TOKEN_SECRET) {
  throw new Error('Missing env variable: TOKEN_SECRET')
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      throw new Error('Could not parse Header')
    }
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, TOKEN_SECRET)
    if (!decodedToken) {
      throw new Error('Invalid token')
    }
    res.locals['decodedToken'] = decodedToken
    next()
  } catch (e) {
    res.status(401).send(`Invalid token ${e}`)
  }
}

export default verifyAuthToken
