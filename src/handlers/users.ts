import express, {Request, Response} from 'express';
import {User, MyUserStore} from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//const tokenSecret = process.env.TOKEN_SECRET;

const store= new MyUserStore();

const index = async(_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async(req: Request, res: Response) => {
    try{
        console.log(req.params.id);
        const users = await store.show(req.params.id);
        res.json(users);
    }catch(err) {
        res.status(400)
        res.json(err)
    }
}

const create = async(req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            password: req.body.password
        }

        const newUser = await store.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        console.log(process.env.TOKEN_SECRET);
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader){
            const token = authorizationHeader.split(' ')[1]
            jwt.verify(token, process.env.TOKEN_SECRET as string);
            next();
        }else{
            res.status(401);
        res.json('No token ');
        }
    } catch (error) {
        res.status(401);
        res.json('Invalid token ${error}');
        return;
    }
}

const myuser_routes = (app: express.Application)=> {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', verifyAuthToken, create)
}
export default myuser_routes;