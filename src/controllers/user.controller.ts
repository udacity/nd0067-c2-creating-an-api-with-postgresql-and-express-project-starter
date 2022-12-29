import express,{Router} from 'express'
import { User, UserModel } from '../models/user.model';
class UserController{

    public static async index(req:express.Request,res:express.Response){
        const model:UserModel = new UserModel
        let users = await model.index()

        res.status(200).json(users);
    }

    public static async create(req:express.Request,res:express.Response){
        const model:UserModel = new UserModel
        
        try{
            if(req.body.firstName!= undefined && req.body.lastName != undefined && req.body.password != undefined){
                let user:User = {
                    id: 0,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password
                }
                user = await model.create(user);
                res.status(200).json(user);
            }else{
                res.status(500).send('Names and Password must not be null');
            }
            
        }catch(err){
            res.status(500).send(err);
        }
        
    }

    public static async show(req:express.Request,res:express.Response){
        const model:UserModel = new UserModel
       
        try{
            if(req.params.id != undefined){
                let user = await model.show(req.params.id);
                res.status(200).json(user)
            }else{
                res.status(500).send('Id of the user required')
            }
            
        }catch(err){
            res.status(500).send(err);
        }
    }


    
}

const userRouter:Router = Router()

userRouter.get('/',UserController.index);
userRouter.post('/',UserController.create);
userRouter.get('/:id',UserController.show);

export {
    UserController,
    userRouter,
};