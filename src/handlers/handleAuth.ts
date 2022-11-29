import jsonwebtoken from 'jsonwebtoken';
import {UserStore} from "../models/userModel";

const store = new UserStore();

export const loginCheck = async ({
                                     firstName,
                                     lastName,
                                     password
                                 }: { firstName: string, lastName: string, password: string }) => {
    const verify = await authJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGF2aWQiLCJpYXQiOjE2Njk3NDMxMjd9.XISGVLkut860DV-5-pNjwXkPjIIksaiC8ZuJWmd3fkc')
    if (!verify) {
        return false
    }

    const auth = await store.login(firstName, lastName, password);
    if (auth) {
        const token = jsonwebtoken.sign({firstName: firstName, lastName: lastName}, process.env.JWT_KEY!)
        return token
    }
}

export const authJWT = (token: string) => {
    const secretKey = process.env.JWT_KEY!;
    // const copyToken = jsonwebtoken.sign({user:'david'}, secretKey);
    // console.log(`--> valid toke ${copyToken}`);
    const verifyResult = jsonwebtoken.verify(token, secretKey);
    // console.log(`--> verify result resp ${verifyResult}`);
    if (verifyResult) {
        return true;
    } else {
        return false
    }
}