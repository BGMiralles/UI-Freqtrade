import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role !== "super_admin") {
    return res.json('You are not a super admin')
  }

  next();
}

export { isSuperAdmin }

