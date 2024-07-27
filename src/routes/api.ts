import express, { Request, Response, NextFunction } from 'express';
// TYPES
import { SuccessResponse } from '../types/response.type';
// ROUTES
import AuthRoutes from './authentication.route';
import protectedRoutes from './protected.route';
// MIDDLEWARE
import { isAuthenticated } from '../middleware/authentication.middleware';

// @PATH : '/api/v1'
const router = express.Router();

// Home endpoint
router.get(`/`, (req: Request, res: Response<SuccessResponse>, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        status_code: 200,
        status_message: `API's homepage`
    });
});

// Routes //
router.use(`/auth`, AuthRoutes);
router.use(`/protected`, isAuthenticated, protectedRoutes);


// Export router
export { router }