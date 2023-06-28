import { Request, Response, NextFunction } from 'express';

export function loggerMiddleare(req: Request, res: Response, next: NextFunction) {
  //console.log(req.originalUrl);

  next();
};