import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) return next(new ExpressError(401, 'Unauthorized: User must be logged in'));
    next();
};