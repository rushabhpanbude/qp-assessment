import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import * as OrderModel from '../models/orderModel';
import * as OrderItemsModel from '../models/orderItemsModel';
import * as GroceryModel from '../models/groceryModel';
import { ResultSetHeader } from 'mysql2';  // Import ResultSetHeader

export const placeOrder = async (req: Request, res: Response) => {
  const { items } = req.body; // array of { groceryId, quantity }
  try {
    const userId = 1; // Assume the user is logged in and their ID is 1
    const orderResult = await OrderModel.createOrder(userId);
    
    // Cast the result to ResultSetHeader
    const resultSetHeader = orderResult as ResultSetHeader;
    const orderId = resultSetHeader.insertId;  // Access insertId

    // Add items to the order and update inventory
    for (const item of items) {
      await OrderItemsModel.addOrderItem(orderId, item.groceryId, item.quantity);
      await GroceryModel.updateInventory(item.groceryId, item.quantity);
    }

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getGroceries = async (req: Request, res: Response) => {
  try {
    const groceries = await GroceryModel.getAllGroceries();
    res.status(200).json(groceries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
