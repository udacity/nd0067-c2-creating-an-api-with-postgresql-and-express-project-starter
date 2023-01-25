import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

export const  AuthMiddleware = (req:express.Request,res:express.Response,next:express.NextFunction) => {
    const authorizationHeader = req.headers.authorization as string
    try{
        const token = authorizationHeader.split(' ')[1]
        const decoded = <{user:object}>jwt.verify(token, process.env.TOKEN_SECRET as string)

        console.log('DECODED ',decoded,typeof decoded)
        req.body.user = decoded.user
        next()
    }catch(err){
        console.log(err)
        res.status(401).send("Unauthorized")
    }    
}