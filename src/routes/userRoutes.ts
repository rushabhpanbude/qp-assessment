import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

// User routes
router.get('/groceries', UserController.getGroceries);
router.post('/order', UserController.placeOrder);

export default router;
