import supertest from 'supertest';
import app from '../../server';
import { IUser } from '../../models/user';
const request = supertest(app);

describe('Users endpoints', () => {
  beforeAll(async () => {
    const userData: IUser = {
      email: 'token@test.test',
      password: 'tokenpassword',
      first_name: 'Token',
      last_name: 'Test',
    };
    await request.post('/users/signup').send(userData);
  });


  it('should return a list of users', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return a user by id', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

});

const generateToken = async (): Promise<string> => {
  const res = await request
    .post('/user/login')
    .send({
      email: 'token@test.test',
      password: 'tokenpassword',
    });
  const token = res.body.token;
  return token;
};
