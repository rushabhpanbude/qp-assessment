import express from 'express';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

// Prefix admin and user routes with respective paths
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);

export default router;
