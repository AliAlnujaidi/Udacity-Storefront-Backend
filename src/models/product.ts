import db from '../configs/database';

export type IProduct = {
  name: string;
  price: number;
};

export class Product {
  async selectAll() {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      return `Could not get products. Error: ${error}`;
    }
  }

  async selectById(id: number) {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new Error(`Could not get product. Error: ${error}`);
    }
  }

  async createProduct(productData: IProduct) {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [
        productData.name,
        productData.price,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return `Could not add new product ${productData.name}. Error: ${error}`;
    }
  }

  async update(id: number, productData: IProduct) {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE products SET price = $1 WHERE id = $2 RETURNING *';
      const result = await conn.query(sql, [
        productData.price,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return `Could not update product ${id}. Error: ${error}`;
    }
  }

  async delete(id: number) {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return `Could not delete product ${id}. Error: ${error}`;
    }
  }
}
