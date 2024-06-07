import type { Request, Response, NextFunction } from 'express';

const checkScope = (requiredScope: string) => {
  console.log("scope check");
  return (req: Request, res: Response, next: NextFunction) => {
    const userScopes = req.user?.permissions; // Assuming user scopes are stored in req.user

    if (!userScopes || !userScopes.includes(requiredScope)) {
      return res.status(403).json({ status: false, message: 'Forbidden: Insufficient scope' });
    }

    next();
  };
};

export default checkScope;
