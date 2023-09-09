import { Order, IOrder } from '../../models/order';

const order = new Order();

describe('Order Model', () => {
  it('should have a createOrder method and return an order when created', async () => {
    const orderData: IOrder = {
      user_id: 1,
      status: 'active',
    };
    const result = await order.createOrder(orderData);
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active',
    });
  });

  it('should have a getUserCurrentOrder method and return an order when created', async () => {
    const result = await order.getUserCurrentOrder(1);
    expect(result).toEqual([]);
  });

  it('should have a selectById method and return an order when created', async () => {
    const result = await order.selectById(1);
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active',
    });
  });
});
