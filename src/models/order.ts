import db from '../configs/database';
export type IOrder = {
  user_id: number;
  status: string;
};

export class Order {
  async selectById(id: number) {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM orders WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new Error(`Could not get order. Error: ${error}`);
    }
  }

  async createOrder(orderData: IOrder) {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [orderData.user_id, 'active']);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return `Could not add new order. Error: ${error}`;
    }
  }

  async getUserCurrentOrder(user_id: number) {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT * FROM order_products left join products on order_products.product_id = products.id WHERE order_id = (SELECT id FROM orders WHERE user_id = $1 AND status = 'active')";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      return `Could not get user order. Error: ${error}`;
    }
  }
}
