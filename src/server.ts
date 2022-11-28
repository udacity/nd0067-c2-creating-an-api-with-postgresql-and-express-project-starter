import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {ProductStore} from "./models/productModel";
import productIndexRoutes from "./routes/products/productIndex";
import productSingleRoutes from "./routes/products/productSingle";
import userIndexRoutes from "./routes/users/userIndex";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// const corsOptions = {
//     origin: 'localhost',
//     optionsSuccessStatus: 200
// }

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    const productIndex = new ProductStore();
    const resp = productIndex.index();
    res.send('Hello World!')
})

productIndexRoutes(app);
productSingleRoutes(app);
userIndexRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
