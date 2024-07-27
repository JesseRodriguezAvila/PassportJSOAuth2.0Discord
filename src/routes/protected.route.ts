import express, { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from '../types/response.type';


// @PATH : '/api/v1/protected'
const router = express.Router();

router.get(`/status`, (req: Request, res: Response<SuccessResponse>, next: NextFunction) => {
    return res.status(200).json({
        success: true,
        status_code: 200,
        status_message: `User information`, 
        data: {
            user: req.user
        }
    });
});

export default router;