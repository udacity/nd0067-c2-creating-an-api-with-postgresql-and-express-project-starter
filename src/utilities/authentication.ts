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
    // const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS as string))
    const hash = bcrypt.hashSync(
      (password + PEPPER) as string,
      parseInt(SALT_ROUNDS as string)
    );
    console.log("hash", hash);
    return hash;
  } catch (err: unknown) {
    throw new Error(`err in creating the hash, ${err as string}`);
  }
};

export const compareHash = async (password: string, hash: string): Promise<boolean> => {
  try {
    const { PEPPER } = process.env;
    const result = bcrypt.compareSync(password+PEPPER as string, hash);
    // console.log("result = ", result);
    return result;
  } catch (err: unknown) {
    throw new Error(`email or password is not correct, ${err as string}`);
    // return false
  }
};

// createToken('1');
