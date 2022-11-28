import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import {ProductIndex} from "./models/productModel";
import productIndexRoutes from "./routes/productIndex";
import productSingleRoutes from "./routes/productSingle";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// const corsOptions = {
//     origin: 'localhost',
//     optionsSuccessStatus: 200
// }

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    const productIndex = new ProductIndex();
    const resp = productIndex.index();
    res.send('Hello World!')
})

productIndexRoutes(app);
productSingleRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
