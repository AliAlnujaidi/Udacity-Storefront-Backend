import db from '../configs/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export type IUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class User {
  async selectAll() {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      return `Could not get users. Error: ${error}`;
    }
  }

  async selectById(id: number) {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      return new Error(`Could not get user. Error: ${error}`);
    }
  }

  async signup(userData: IUser) {
    try {
      const hashedPassword = bcrypt.hashSync(
        userData.password + process.env.BYCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string),
      );

      console.log(userData)
      const conn = await db.connect();
      
      const sql =
        'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        userData.first_name,
        userData.last_name,
        userData.email,
        hashedPassword,
      ]);
  
      conn.release();
      const token = this.createToken(result.rows[0].id);
      return token;
    } catch (error) {
      return `Could not add new user ${userData.first_name}. Error: ${error}`;
      
    }
  }

  async login(email: string, password: string) {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await conn.query(sql, [email]);
      conn.release();

      if (result.rows.length) {
        const user = result.rows[0];
        if (
          bcrypt.compareSync(
            password + process.env.BYCRYPT_PASSWORD,
            user.password,
          )
        ) {
          const token = this.createToken(result.rows[0].id);
          return token;
        }
      }
      return 'invalid credentials';
    } catch (error) {
      return new Error(`Could not authenticate user. Error: ${error}`);
    }
  }

  async createToken(id: number) {
    const token = jwt.sign({ user: id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }
}
