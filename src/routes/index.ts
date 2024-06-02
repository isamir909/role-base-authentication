import express from 'express';
import type { Request, Response } from 'express';
import { createApplicationController, getApplicationController } from '../controller/application/application.controller';

const router = express.Router();

// Test Route
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ status:true,message: 'Express App Running' });
});


// Application Routes
router.post('/api/applications', createApplicationController); 
router.get('/api/applications', getApplicationController); 


// User Routes
// Auth Routes


// Roles Routes







export default router;
