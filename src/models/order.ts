import db from '../configs/database';
export type IOrder = {
  user_id: number;
  status: string;
};

export class Order {
  async createOrder(user_id: number) {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [user_id, 'active']);
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
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'active'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      return `Could not get user order. Error: ${error}`;
    }
  }
}
