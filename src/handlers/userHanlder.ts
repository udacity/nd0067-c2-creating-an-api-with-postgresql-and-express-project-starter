import { Application, Request, Response } from "express";
import { User, UserModel } from "../models/userModel";
import { compareHash, createHash } from "../utilities/authentication";

//needs return type
const createUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit users/signup");
    const { firstname, lastname, password }: User = req.body;
    const User = new UserModel();
    const hash = createHash(password as string);
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      hash,
    });
    //give a token
    return res.send({ ...user, token: "" });
  } catch (err: unknown) {
    return res.send(`err in creating user, ${err} `);
  }
};

const userLoginHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit users/login");
    const { password, userId } = req.body;
    const User = new UserModel();
    const user = await User.show(userId);
    if (!user) {
      return res.send("err: email doesn't exist");
    }
    const result = await compareHash(password, user.hash as string);
    if (!result) {
      return res.send("password is not correct");
    }
    //give a token
    return res.send({
      ...user,
      token: "",
    });
  } catch (err: unknown) {
    return res.send(`err in creating user, ${err} `);
  }
};

const deleteUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit users/delete/:userId");
    const User = new UserModel();
    await User.delete(req.params.userId);
    //even if user doesn't exist this will return the deletion statement of the user like with id=1000
    return res.send("user is deleted");
  } catch (err: unknown) {
    return res.send(
      `err in deleting user with id ${req.params.userId}, err: ${err} `
    );
  }
};

const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit users/index");
    const User = new UserModel();
    const users = await User.index();
    return res.send(users);
  } catch (err: unknown) {
    return res.send(`err in getting all users, err: ${err} `);
  }
};

const getOneUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("hit users/show/:userId");
    const User = new UserModel();
    const user = await User.show(req.params.userId);
    if (!user) {
      return res.send("no user found with this userId");
    }
    const { id, firstname, lastname } = user;
    return res.send({ id, firstname, lastname, token: "" });
  } catch (err: unknown) {
    return res.send(
      `err in getting user with Id ${req.params.userId}, err: ${err} `
    );
  }
};

const userRouter = (app: Application): void => {
  app.post("/users/signup", createUserHandler);
  app.post("/users/login", userLoginHandler);
  app.post("/users/delete/:userId", deleteUserHandler);
  app.get("/users/index", getAllUsersHandler);
  app.get("/users/show/:userId", getOneUserByIdHandler);
};

export default userRouter;
