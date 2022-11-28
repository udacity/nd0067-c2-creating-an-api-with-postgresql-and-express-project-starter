import jsonwebtoken from 'jsonwebtoken';
import {UserStore} from "../models/userModel";

const store = new UserStore();
const {sign, decode, verify} = jsonwebtoken;

export const loginCheck = async () => {
    const verify = await authJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia292YXgiLCJpYXQiOjE2Njk2NjY2MjZ9.oZkO7UuhdAdCj_KVT3yZ13oznspAECIrP9v1osbl0DM')
    if (!verify) {
        return false
    }

    const auth = await store.login('kovax', 'richards', 'bark');
    if (auth) {
        return true
    }

}

export const authJWT = (token: string) => {
    const secretKey = process.env.JWT_KEY!;

    const result = jsonwebtoken.sign({user: 'kovax'}, secretKey);
    const verifyResult = jsonwebtoken.verify(token, '1234');
    console.log(verifyResult);
    return ('true');
}