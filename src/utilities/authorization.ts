import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export const authorizationMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const data = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET_KEY as string
    );
    // console.log("data after verifying", data);
    //res.locals.userIdInToken will be used for functions that needs to know which user does this token has 
    //authority upon to update
    res.locals.userIdInToken = (data as JwtPayload).userId
    next();
  } catch (err: unknown) {
    throw new Error(`err in authorizing user, err: ${err}`);
  }
};
