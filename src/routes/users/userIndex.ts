import express, {Request, Response} from "express";
import {UserStore} from "../../models/userModel";
import {authJWT, loginCheck} from "../../handlers/handleAuth";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const authData = {
        firstName: 'kovax',
        lastName: 'richards',
        password: 'bark',

    }

    const auth = await loginCheck(authData);

    if (auth) {
        const users = await store.index();
        await res.json(users);
    } else {
        res.send('login failed');
    }
}

const create = async (req: Request, res: Response) => {
    const body = req.body;
    console.log(`this is the req msg ${body.msg}`)
    res.json(body);
}

const userIndexRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', index);
}

export default userIndexRoutes;