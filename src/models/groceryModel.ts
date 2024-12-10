import { db } from '../database';
import { ResultSetHeader } from 'mysql2';

export interface Grocery {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Add new grocery item
export const addGrocery = async (name: string, price: number, quantity: number): Promise<ResultSetHeader> => {
  // Check for invalid or empty values
  if (!name || price == null || quantity == null) {
    throw new Error('Invalid input values');
  }

  const query = 'INSERT INTO groceries (name, price, quantity) VALUES (?, ?, ?)';
  const [result] = await db.execute(query, [name, price, quantity]);
  return result as ResultSetHeader; 
};


// Get all available groceries
export const getAllGroceries = async () => {
  const [rows] = await db.query('SELECT id, name, price, quantity FROM groceries WHERE quantity > 0');
  return rows;
};

// Update existing grocery item
export const updateGrocery = async (id: number, name: string, price: number, quantity: number): Promise<ResultSetHeader> => {
  const [result] = await db.query('UPDATE groceries SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, id]);
  return result as ResultSetHeader;
};

// Remove grocery item
export const removeGrocery = async (id: number): Promise<ResultSetHeader> => {
  const [result] = await db.query('DELETE FROM groceries WHERE id = ?', [id]);
  return result as ResultSetHeader;
};

// Update inventory for a grocery item
export const updateInventory = async (id: number, quantity: number): Promise<ResultSetHeader> => {
  const [result] = await db.query('UPDATE groceries SET quantity = ? WHERE id = ?', [quantity, id]);
  return result as ResultSetHeader;
};
