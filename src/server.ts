import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { user_routes } from './handlers/users';
import { product_routes } from './handlers/products';
import { order_routes } from './handlers/orders';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

user_routes(app);
product_routes(app);
order_routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
