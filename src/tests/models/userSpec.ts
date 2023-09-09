import { User, IUser } from '../../models/user';

const user = new User();

describe('User Model', () => {
  beforeAll(async () => {
    const userData: IUser = {
      email: 'beforeall@test.test',
      password: 'test',
      first_name: 'before',
      last_name: 'all',
    };
    await user.signup(userData);
  });

  it('it should have signup method and return token', async () => {
    const userData: IUser = {
      email: 'test@test.test',
      password: 'test',
      first_name: 'test',
      last_name: 'test',
    };
    const result = await user.signup(userData);
    expect(result).not.toBe('Could not add new user');
  });

  it('should have a login method', async () => {
    const result = await user.login('test@test.test', 'test');
    expect(result).toBeDefined();
  });

  it('should have an index method', async () => {
    const result = await user.selectAll();
    expect(result).toBeDefined();
  });

  it('should have a show method', async () => {
    const result = await user.selectById(1);
    expect(result).toBeDefined();
  });

  afterAll(async () => {
    await user.deleteUserByEmail('beforeall@test.test');
    await user.deleteUserByEmail('test@test.test');
  });
});
