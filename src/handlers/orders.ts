import express, { Request, Response } from 'express';
import { IOrder, Order } from '../models/order';
import { requireAuth } from '../middlewares/JWTMiddleware';
import jwt from 'jsonwebtoken';

const order = new Order();
export const order_routes = (app: express.Application) => {
  app.post(
    '/orders/create',
    requireAuth,
    async (req: Request, res: Response) => {
      const orderData: IOrder = req.body;
      const result = await order.createOrder(orderData);
      res.json(result);
    },
  );

  app.get('/orders/user/:token', async (req: Request, res: Response) => {
    try {
      const token = req.params.token;
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const result = await order.getUserCurrentOrder(decoded.user);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
};
