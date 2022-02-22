import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';

const app: express.Application = express()
const address: string = "localhost:3000"

const corsOptions = {
    origin: 'http://localhost', //White list
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/test-cors', function (req, res) {
    res.json({msg: "This is CORS-enabled with a middle ware"})
})

productRoutes(app)
userRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
