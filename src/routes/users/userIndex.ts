import express, {Request, Response} from "express";
import {UserStore} from "../../models/userModel";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const auth = await store.authenticate('kovax', 'richards', 'bark');

    if (auth) {
        const users = await store.index();
        await res.json(users);
    } else {
        res.send('login failed');
    }
}

const userIndexRoutes = (app: express.Application) => {
    app.get('/users', index);
}

export default userIndexRoutes;