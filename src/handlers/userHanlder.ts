import { Application, Request, Response } from "express";
import { UserModel } from "../models/userModel";

//needs return type
const createUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log('hit users/signup')
    const User = new UserModel();
    const result = await User.create({
      firstname: req.body.firstname,
      lastname:req.body.lastname, 
      hash: req.body.hash,
    });
    return res.send(result);
  } catch (err: unknown) {
    return res.send(`err in creating user, ${err} `);
  }
};


const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log('hit users/delete/:userId')
    const User = new UserModel();
    const result = await User.delete(req.params.userId);
    return res.send(result);
  } catch (err: unknown) {
    return res.send(`err in deleting user with id ${req.params.userId}, err: ${err} `);
  }
};

const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log('hit users/index')
    const User = new UserModel();
    const result = await User.index();
    return res.send(result);
  } catch (err: unknown) {
    return res.send(`err in getting all users, err: ${err} `);
  }
};

const getOneUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log('hit users/show/:userId')
    const User = new UserModel();
    const result = await User.show(req.params.userId);
    if(!result){
        return res.send('no user found with this id')
    }
    return res.send(result);
  } catch (err: unknown) {
    return res.send(`err in getting user with Id ${req.params.userId}, err: ${err} `);
  }
};

const userRouter = (app: Application): void => {
  app.post("/users/signup", createUserHandler);
  app.get("/users/delete/:userId", deleteUser);
  app.get("/users/index", getAllUsers);
  app.get("/users/show/:userId", getOneUserById);
};

export default userRouter;
