import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';

const request = supertest(app);
const user = new User();

describe('Products endpoints', () => {
  let token: string;
  beforeAll(async () => {
    token = await user.createToken(7);
  });

  it('list of products endpoint', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('product by id endpoint', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('create a product endpoint', async () => {
    const productData = {
      name: 'endpoint',
      price: 10,
    };
    const response = await request
      .post('/products/create')
      .send(productData)
      .set({ token: token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('update a product endpoint', async () => {
    const productData = {
      name: 'endpoint',
      price: 10,
    };
    const response = await request
      .put('/products/1')
      .send(productData)
      .set({ token: token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('delete a product endpoint', async () => {
    const response = await request.delete('/products/1').set({ token: token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
