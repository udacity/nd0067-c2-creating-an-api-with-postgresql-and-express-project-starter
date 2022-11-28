import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {ProductStore} from "./models/productModel";
import productIndexRoutes from "./routes/products/productIndex";
import userIndexRoutes from "./routes/users/userIndex";
import {authJWT} from "./handlers/handleAuth";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// const corsOptions = {
//     origin: 'localhost',
//     optionsSuccessStatus: 200
// }

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    // const productIndex = new ProductStore();
    // const resp = authJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia292YXgiLCJpYXQiOjE2Njk2NjY2MjZ9.oZkO7UuhdAdCj_KVT3yZ13oznspAECIrP9v1osbl0DM');
    // console.log(resp);
    res.send('Hello World!')
})

productIndexRoutes(app);
userIndexRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
