import express, {Request, Response} from "express";
import {UserStore} from "../models/userModel";
import {authJWT} from "../handlers/handleAuth";
import bcrypt from 'bcrypt';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    const authData = {
        firstName: 'kovax',
        lastName: 'richards',
        password: 'bark',
    }

    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const users = await store.index();
        await res.json(users);
    } else {
        res.send('login failed');
    }
}

const single = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const userId: number = parseInt(<string>req.query.id);
        const product = await store.single(userId);
        await res.json(product);
    } else {
        res.json({msg: 'auth fail'});
    }
}

const create = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        if (firstName && lastName && password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            if (hashedPassword! === 'fail') {
                res.json({msg: 'hash fail'});
            } else {
                const resp = store.create(firstName, lastName, hashedPassword!);
                console.log(`this is the user create resp ${resp}`)
                res.json(resp);
            }
        }
    else
        {
            res.json({msg: 'auth fail'});
        }
    }
}

const userIndexRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users/show', single);
    app.get('/users', index);
}

export default userIndexRoutes;