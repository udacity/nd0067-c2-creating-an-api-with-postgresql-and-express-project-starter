import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
        }
        next()
    } catch (err) {
        res.status(401)
        res.send(err)
    }
}

export default verifyToken