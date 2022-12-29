import express, { Router } from 'express'
import { User, UserModel } from '../models/user.model'
import jwt from 'jsonwebtoken'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'

class UserController {

    public static async index(req: express.Request, res: express.Response) {
        const model: UserModel = new UserModel
        let users = await model.index()

        res.status(200).json(users);
    }

    public static async create(req: express.Request, res: express.Response) {
        const model: UserModel = new UserModel

        try {
            if (req.body.firstName != undefined && req.body.lastName != undefined && req.body.username != undefined && req.body.password != undefined) {
                let user: User = {
                    id: 0,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    password: req.body.password
                }
                user = await model.create(user);
                res.status(200).json(user);
            } else {
                res.status(500).send('Names and Password must not be null');
            }

        } catch (err) {
            res.status(500).send(err);
        }

    }

    public static async show(req: express.Request, res: express.Response) {
        const model: UserModel = new UserModel

        try {
            if (req.params.id != undefined) {
                let user = await model.show(req.params.id);
                res.status(200).json(user)
            } else {
                res.status(500).send('Id of the user required')
            }

        } catch (err) {
            res.status(500).send(err);
        }
    }


    public static async verify(req: express.Request, res: express.Response) {
        const user: UserModel = new UserModel

        try {
            let result = await user.attempt(req.body.username,req.body.password)
            console.log('RESULT',result)
            if(result !== '' && result){
                // Create token
                const tokenSecret = process.env.TOKEN_SECRET as string
                let user = result as User
                user.password = ''
                const token = jwt.sign({user},tokenSecret)

                res.status(200).json({
                    token
                })
            }else{
                res.status(500).send('WRONG Credential')
            }
        } catch (err) {
            res.status(500).send(String(err));
        }
    }


}

const userRouter: Router = Router()

userRouter.get('/', UserController.index);
userRouter.post('/', UserController.create);
userRouter.get('/:id', UserController.show);
userRouter.post('/verify', UserController.verify);

export {
    UserController,
    userRouter,
};