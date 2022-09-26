import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createToken = (userId: string): string => {
  try {
    // console.log("token secret", process.env.TOKEN_SECRET_KEY);
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY as string);
    return token;
  } catch (err: unknown) {
    throw new Error(`err in creating a token, ${err as string}`);
  }
};

export const createHash = (password: string): string => {
  try {
    const { SALT_ROUNDS, PEPPER } = process.env;
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS as string))
    const hash = bcrypt.hashSync(
      (password + PEPPER) as string,
      salt
    );
    return hash;
  } catch (err: unknown) {
    throw new Error(`err in creating the hash, ${err as string}`);
  }
};

// createToken('1');
