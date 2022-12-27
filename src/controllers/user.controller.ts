import express,{Router} from 'express'

class UserController{

    public static index(req:express.Request,res:express.Response){
        res.sendStatus(200);
    }
}

const userRouter:Router = Router()

userRouter.get('/',UserController.index);

export {
    UserController,
    userRouter,
};