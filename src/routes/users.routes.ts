import express from 'express'
import UserControllers from '../handler/user.controllers'
import verifyAuthToken from '~/middleware/verifyAuthToken'
const userRouter = express.Router()
userRouter.get('/', verifyAuthToken, UserControllers.getAllUsers)
userRouter.post('/register', UserControllers.create)
userRouter.post('/demoUser', UserControllers.addDemoUser)
userRouter.post('/login', UserControllers.authenticateUser)
userRouter.get('/:id', verifyAuthToken, UserControllers.getUser)

export default userRouter
