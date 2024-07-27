import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { SuccessResponse } from '../types/response.type';
import { isAuthenticated } from '../middleware/authentication.middleware';
import ExpressError from '../utils/ExpressError';

// @PATH: /api/v1/auth
const router = express.Router();

/**
 *  @DESC: Direct our client to discord's third-party authentication services
 *  @PATH: http://localhost:3000/api/v1/auth/discord
 **/
router.get(
    `/discord`,
    passport.authenticate('discord'),
); 

/**
 *  @PATH: http://localhost:3000/api/v1/auth/discord/redirect
 *  @DESC: DISCORD's redirect 
 *         Will send with a query 'code', in Our startegy config, it will exchange for access & refresh token
 *         http://localhost:3000/api/v1/auth/discord/redirect?code=vzjsda5fakesd3moyfYtNV4qnTu
 *  
 **/
router.get(
    `/discord/redirect`,
    passport.authenticate('discord'), // take code sent and exchange for an access/refresh token
    (req: Request, res: Response<SuccessResponse>, next: NextFunction) => {
        return res.status(200).json({
            success: true,
            status_code: 200,
            status_message: 'login/sigup successful'
        });
    }
)

// Change route method to POST LATER
router.get(
    `/logout`, 
    isAuthenticated,
    (req: Request, res: Response<SuccessResponse>, next: NextFunction) => {
        const status_message = `${req.user?.username} successfully logged out`;
        req.logOut((err) => {
            if (err) return next(new ExpressError(500, 'Unable to logout'));
            return res.status(200).json({
                success: true,
                status_code: 200,
                status_message
            });
        });
    },
);

export default router;