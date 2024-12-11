import { ResultSetHeader } from 'mysql2';
import { db } from '../database';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
}

export class UserModel {
  static async createUser(firstName: string, lastName: string, phoneNumber: string): Promise<{ insertId: number }> {
    const [result] = await db.query(
      'INSERT INTO users (firstName, lastName, phoneNumber) VALUES (?, ?, ?)',
      [firstName, lastName, phoneNumber]
    );

    // Cast result to ResultSetHeader
    const insertResult = result as ResultSetHeader;

    return { insertId: insertResult.insertId };
  }

  static async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const [rows] = await db.query('SELECT * FROM users WHERE phoneNumber = ?', [phoneNumber]);

    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }
}
