import { db } from '../database';

export interface OrderItem {
  id: number;
  orderId: number;
  groceryId: number;
  quantity: number;
}

// Add a grocery item to the order
export const addOrderItem = async (orderId: number, groceryId: number, quantity: number) => {
  const [result] = await db.query(
    'INSERT INTO order_items (orderId, groceryId, quantity) VALUES (?, ?, ?)',
    [orderId, groceryId, quantity]
  );
  return result;
};

// Get items for a specific order
export const getOrderItemsByOrderId = async (orderId: number) => {
  const [rows] = await db.query(
    'SELECT * FROM order_items WHERE orderId = ?',
    [orderId]
  );
  return rows;
};
