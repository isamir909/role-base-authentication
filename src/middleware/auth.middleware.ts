import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import type { logedInUser } from '../types/user/usr.type';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
console.log(token);

  if (!token) {
    return res.status(401).json({ status: false, message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as logedInUser;
    console.log(decoded);
    
    req.user = decoded; // Assuming the decoded token contains user information
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: 'Invalid token' });
  }
};

export default authenticate;
