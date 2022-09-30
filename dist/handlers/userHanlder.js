"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const authentication_1 = require("../utilities/authentication");
const authorization_1 = require("../utilities/authorization");
//needs return type
const createUserHandler = async (req, res) => {
    try {
        // console.log("hit users/signup");
        const { firstname, lastname, password } = req.body;
        const User = new userModel_1.UserModel();
        const hash = (0, authentication_1.createHash)(password);
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            hash,
        });
        //give a token
        const accessToken = (0, authentication_1.createToken)(user.id);
        return res.send({ ...user, accessToken });
    }
    catch (err) {
        return res.send(`err in creating user, ${err} `);
    }
};
const userLoginHandler = async (req, res) => {
    try {
        // console.log("hit users/login");
        const { password, userId } = req.body;
        const User = new userModel_1.UserModel();
        const user = await User.show(userId);
        if (!user) {
            return res.send("err: user with this id doesn't exist");
        }
        // console.log("user", user);
        const result = await (0, authentication_1.compareHash)(password, user.hash);
        if (!result) {
            return res.send("password is not correct");
        }
        //give a token
        const accessToken = (0, authentication_1.createToken)(userId);
        const { id, firstname, lastname } = user;
        return res.send({
            id,
            firstname,
            lastname,
            accessToken,
        });
    }
    catch (err) {
        return res.send(`err in creating user, ${err} `);
    }
};
const deleteUserHandler = async (req, res) => {
    try {
        // console.log("hit users/delete/:userId");
        //I could have just deleted the user with userId in the token, but I wrote the function this way (with if statement)
        //to allow for future if-else statements (like: if customer service decided to delete the user account)
        if (res.locals.userIdInToken != req.params.userId) {
            return res.send(`you don\'t have the authority to delete the user with id ${req.params.userid}`);
        }
        const User = new userModel_1.UserModel();
        await User.delete(req.params.userId);
        //even if user doesn't exist this will return the deletion statement of the user like with userId=1000
        return res.send("user is deleted");
    }
    catch (err) {
        return res.send(`err in deleting user with id ${req.params.userId}, err: ${err} `);
    }
};
const getAllUsersHandler = async (req, res) => {
    try {
        // console.log("hit users/index");
        const User = new userModel_1.UserModel();
        const users = await User.index();
        return res.send(users);
    }
    catch (err) {
        return res.send(`err in getting all users, err: ${err} `);
    }
};
const getOneUserByIdHandler = async (req, res) => {
    try {
        // console.log("hit users/show/:userId");
        if (res.locals.userIdInToken != req.params.userId) {
            return res.send(`you don\'t have the authority to view the user with id ${req.params.userId}`);
        }
        const User = new userModel_1.UserModel();
        const user = await User.show(req.params.userId);
        if (!user) {
            return res.send("no user found with this userId");
        }
        const { id, firstname, lastname } = user;
        return res.send({ id, firstname, lastname });
    }
    catch (err) {
        return res.send(`err in getting user with Id ${req.params.userId}, err: ${err} `);
    }
};
const userRouter = (app) => {
    app.post("/users/signup", createUserHandler);
    app.post("/users/login", userLoginHandler);
    //this is an extra endpoint (don't have a test)
    app.delete("/users/delete/:userId", authorization_1.authorizationMiddleWare, deleteUserHandler);
    app.get("/users/index", authorization_1.authorizationMiddleWare, getAllUsersHandler);
    //note (I made the user not allowed to view other users data in this route specifically, but I let him to do so 
    //via the index route above -just for the proof of concept-)
    app.get("/users/show/:userId", authorization_1.authorizationMiddleWare, getOneUserByIdHandler);
};
exports.default = userRouter;
