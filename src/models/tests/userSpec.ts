import { User } from '../user';
const user = new User();
describe('User', () => {
  it('should return defined result', async () => {
    expect(user.selectAll()).toBeDefined();
  });

  it('should return defined result', async () => {
    const result = await user.selectAll();
    expect(result).toEqual([]);
  });
});
