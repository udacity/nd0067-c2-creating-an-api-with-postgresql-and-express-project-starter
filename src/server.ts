import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {ProductStore} from "./models/productModel";
import productIndexRoutes from "./routes/products/productModel";
import userIndexRoutes from "./routes/users/userModel";
import {authJWT} from "./handlers/handleAuth";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// const corsOptions = {
//     origin: 'localhost',
//     optionsSuccessStatus: 200
// }

app.use(bodyParser.json())

app.post('/', function (req: Request, res: Response) {
    // const store = new ProductStore();

    res.send('Hello World!')
})

productIndexRoutes(app);
userIndexRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
