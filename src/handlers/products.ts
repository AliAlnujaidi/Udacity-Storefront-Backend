import express, { Request, Response } from 'express';
import { IProduct, Product } from '../models/product';
import { requireAuth } from '../middlewares/JWTMiddleware';
const product = new Product();
export const product_routes = (app: express.Application) => {
  app.get('/products', async (req: Request, res: Response) => {
    try {
      const result = await product.selectAll();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/products/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = await product.selectById(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.post(
    '/products/create',
    requireAuth,
    async (req: Request, res: Response) => {
      try {
        const productData: IProduct = req.body;
        const result = await product.createProduct(productData);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error });
      }
    },
  );

  app.put('/products/:id', requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const productData: IProduct = req.body;
      const result = await product.update(id, productData);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.delete(
    '/products/:id',
    requireAuth,
    async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);
        const result = await product.delete(id);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error });
      }
    },
  );
};
