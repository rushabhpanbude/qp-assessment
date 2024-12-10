import { db } from '../database';
import { ResultSetHeader } from 'mysql2';

export interface Order {
  id: number;
  userId: number;
  createdAt: Date;
}

// Create a new order
export const createOrder = async (userId: number): Promise<ResultSetHeader> => {
  const query = 'INSERT INTO orders (user_id) VALUES (?)';
  const [result] = await db.execute(query, [userId]);
  
  return result as ResultSetHeader;  // Cast to ResultSetHeader here
};

// Get order by ID
export const getOrderById = async (id: number) => {
  const [rows] = await db.query(
    'SELECT * FROM orders WHERE id = ?',
    [id]
  );
  return rows;
};
