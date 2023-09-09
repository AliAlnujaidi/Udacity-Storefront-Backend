import { Order, IOrder } from '../../models/order';
import { User } from '../../models/user';

const order = new Order();
const user = new User();
describe('Order Model', () => {
  let orderUser: any;
  beforeAll(async () => {
    const userData = {
      email: 'order@test.test',
      password: 'test',
      first_name: 'order',
      last_name: 'test',
    };
    await user.signup(userData);
    orderUser = await user.getUserByEmail(userData.email);
    await order.createOrder({
      user_id: orderUser.id,
      status: 'active',
    });
  });

  it('should have a createOrder method and return an order when created', async () => {
    const orderData: IOrder = {
      user_id: orderUser.id,
      status: 'active',
    };
    const result = await order.createOrder(orderData);
    expect(result).toEqual({
      id: result.id,
      user_id: orderUser.id.toString(),
      status: 'active',
    });
  });

  it('should have a getUserCurrentOrder method', async () => {
    const result = await order.getUserCurrentOrder(1);
    expect(result).toBeDefined([]);
  });
});
