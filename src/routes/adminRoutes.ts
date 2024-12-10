import express from 'express';
import * as AdminController from '../controllers/adminController';

const router = express.Router();

// Admin routes
router.post('/grocery', AdminController.addGrocery);
router.get('/groceries', AdminController.getGroceries);
router.delete('/grocery/:id', AdminController.removeGrocery);
router.put('/grocery/:id', AdminController.updateGrocery);
router.patch('/grocery/:id/inventory', AdminController.updateInventory);

export default router;
