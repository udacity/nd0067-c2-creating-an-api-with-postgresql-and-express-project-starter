import { NextFunction, Request, Response } from 'express'

const { TOKEN_SECRET } = process.env

if (!TOKEN_SECRET) {
  throw new Error('Missing env variable: TOKEN_SECRET')
}

const verifyUserId = (req: Request, res: Response, next: NextFunction): void => {
  const decodedToken = res.locals['decodedToken']
  const user_id = parseInt(req.params['id'], 10) || req.body['id'] || req.body['user_id']
  if (!decodedToken || !decodedToken.user || decodedToken.user.id !== user_id) {
    res.status(401).send('You are not authorized to make changes to that user!')
    return
  }
  next()
}

export default verifyUserId
