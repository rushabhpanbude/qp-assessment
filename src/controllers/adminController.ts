import { Request, Response } from 'express';
import * as GroceryModel from '../models/groceryModel';
import { ResultSetHeader } from 'mysql2';  // Use ResultSetHeader

export const addGrocery = async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;

  console.log('Received input:', { name, price, quantity });  // Add this log for debugging

  try {
    const result: ResultSetHeader = await GroceryModel.addGrocery(name, price, quantity);
    res.status(201).json({ message: 'Grocery item added', id: result.insertId });
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

export const removeGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;  // Get the grocery item ID from the request parameters
  try {
    const result: ResultSetHeader = await GroceryModel.removeGrocery(Number(id));  // Remove the grocery by ID
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Grocery item removed successfully' });
    } else {
      res.status(404).json({ message: 'Grocery item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const updateGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;  // Get the grocery item ID from the request parameters
  const { name, price, quantity } = req.body;  // Get updated details from the request body

  try {
    const result: ResultSetHeader = await GroceryModel.updateGrocery(Number(id), name, price, quantity);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Grocery item updated successfully' });
    } else {
      res.status(404).json({ message: 'Grocery item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const { id } = req.params;  // Get the grocery item ID from the request parameters
  const { quantity } = req.body;  // Get the new quantity from the request body

  try {
    const result: ResultSetHeader = await GroceryModel.updateInventory(Number(id), quantity);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Inventory updated successfully' });
    } else {
      res.status(404).json({ message: 'Grocery item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

