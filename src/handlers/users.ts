import express, { Request, Response } from 'express';
import { IUser, User } from '../models/user';
import { requireAuth } from '../middlewares/JWTMiddleware';
const user = new User();
export const user_routes = (app: express.Application) => {
  app.post('/users/signup', async (req: Request, res: Response) => {
    const userData: IUser = req.body;
    const result = await user.signup(userData);
    res.json(result);
  });

  app.post('/users/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await user.login(email, password);
    res.json(result);
  });

  app.get('/users', requireAuth, async (req: Request, res: Response) => {
    const result = await user.selectAll();
    res.json(result);
  });

  app.get('/users/:id', requireAuth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await user.selectById(id);
    res.json(result);
  });
};
