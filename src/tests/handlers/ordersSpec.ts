import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';

const request = supertest(app);
const user = new User();

describe('Orders endpoints', () => {
  let token: string;
  beforeAll(async () => {
    token = await user.createToken(7);
  });

  it('create an order', async () => {
    const response = await request
      .post('/orders/create')
      .send({
        user_id: 1,
        status: 'active',
      })
      .set({ token: token });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('get user current order', async () => {
    const response = await request.get('/orders/user/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
