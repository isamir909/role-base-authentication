import express from 'express';
import type { Request, Response } from 'express';
import { createApplicationController, getApplicationController } from '../controller/application/application.controller';
import { createUserController, userLoginController } from '../controller/user/user.controller';
import { assignRoleToUserBodyController, createRoleController } from '../controller/role/role.controller';
import authenticate from '../middleware/auth.middleware';
import checkScope from '../middleware/scope.middleware';
import { PERMISSIONS } from '../config/permissions';

const router = express.Router();

// Test Route
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ status:true,message: 'Express App Running' });
});


// Application Routes
router.post('/api/applications', createApplicationController); 
router.get('/api/applications', getApplicationController); 


// User Routes
router.post('/api/user', createUserController); 
router.post('/api/user/login', userLoginController); 


// Roles Routes
router.post('/api/roles',authenticate,checkScope(PERMISSIONS["roles:write"]), createRoleController); 
router.post('/api/roles/assign',authenticate, checkScope(PERMISSIONS['users:roles:write']),assignRoleToUserBodyController); 







export default router;
