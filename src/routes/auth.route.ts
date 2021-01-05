import { Router } from 'express';

import AuthRoute from '../components/Auth';
const router = Router();
/**
 * Init All routes here
 */

// Private Routes
router.use('/api/v1', AuthRoute);

export default router;
