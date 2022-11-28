import express, {Request, Response} from "express";
import {UserIndex} from "../../models/userModel";

const store = new UserIndex();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    await res.json(users);
}

const userIndexRoutes = (app: express.Application) => {
    app.get('/users', index)
}

export default userIndexRoutes;