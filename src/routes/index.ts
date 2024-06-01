import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// Test Route
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ status:true,message: 'Express App Running' });
});

 
// User Routes


// Auth Routes


// Roles Routes


// Application Routes





export default router;
