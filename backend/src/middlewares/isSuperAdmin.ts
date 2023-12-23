import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role.toString() !== "2") {
    return res.json('You must have super admin role to perform this action')
  }

  next();
}

export { isSuperAdmin }

