import supertest from 'supertest';
import app from '../../server';
import { User, IUser } from '../../models/user';

const request = supertest(app);
const user = new User();

describe('Users endpoints', () => {
  let token: string;
  beforeAll(async () => {
    token = await user.createToken(7);
  });

  it('should return a list of users', async () => {
    const response = await request.get('/users').set({ token: token });
    expect(response.status).toBe(200);
  });

  it('should return a user by id', async () => {
    const response = await request.get('/users/1').set({ token: token });
    expect(response.status).toBe(200);
  });

  it('should create a user endpoint working', async () => {
    const userData: IUser = {
      email: 'endpoint@test.test',
      password: 'test',
      first_name: 'endpoint',
      last_name: 'test',
    };
    const response = await request.post('/users/signup').send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should login a user', async () => {
    const userData: IUser = {
      email: 'endpoint@test.test',
      password: 'test',
      first_name: 'endpoint',
      last_name: 'test',
    };
    const response = await request.post('/users/login').send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
