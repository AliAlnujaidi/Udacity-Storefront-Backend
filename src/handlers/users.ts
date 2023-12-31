import express, { Request, Response } from 'express';
import { IUser, User } from '../models/user';
import { requireAuth } from '../middlewares/JWTMiddleware';
const user = new User();
export const user_routes = (app: express.Application) => {
  app.post('/users/signup', async (req: Request, res: Response) => {
    const userData: IUser = req.body;
    try {
      const result = await user.signup(userData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.post('/users/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const result = await user.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/users', requireAuth, async (req: Request, res: Response) => {
    try {
      const result = await user.selectAll();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/users/:id', requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = await user.selectById(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
};
