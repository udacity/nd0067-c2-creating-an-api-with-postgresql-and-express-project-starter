import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import myproduct_routes from './handlers/products';
import myuser_routes from './handlers/users';
import myorder_routes from './handlers/orders';

const app: express.Application = express();
const address = '127.0.0.1:3000';
const corsOptions = {
  origin: 'http://127.0.0.1',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

myproduct_routes(app);
myuser_routes(app);
myorder_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;