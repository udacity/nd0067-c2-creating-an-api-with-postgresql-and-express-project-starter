import {Router, Request, Response} from 'express'
import { User, UserStore } from '../models/usersModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verifyToken from '../lib/auth'

const userInstance = new UserStore()


const createUserRouter = (app: Router) => {
    const userRoute: Router = Router()
    app.use('/Users', userRoute)

    userRoute.get('/', verifyToken, async (req: Request, res: Response) => {
        const userCatalog: User[] = await userInstance.showAllUsers()
        res.json(userCatalog)
})

    userRoute.get('/:id', verifyToken,  async (req: Request, res: Response) => {
        const userID: Number = parseInt(req.params.id)
        const singleUser: User = await userInstance.showUser(userID)
        res.json(singleUser)
})

    userRoute.post('/', async (req: Request, res: Response) => {
        try {
            const createdUser: User = await userInstance.createUser(req.body)
            var token = jwt.sign({ user: createdUser }, (process.env.TOKEN_SECRET!))
            res.json(token)
        } catch (err) {
            res.status(400)
            res.json(err)
        }
})
}

export default createUserRouter
