import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import './passportjs/discord-oauth2-strategy';

// Routes
import { router as api } from '../src/routes/api';
import ExpressError from './utils/ExpressError';
import { FailedResponse } from './types/response.type';

const app = express();

/* Initialized passportjs */
app.use(session({
    secret: 'THISSECRETISNOTSAFE',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport.initialize()); // Intializes Passport for incoming requests, allowing authentication strategies to be applied
app.use(passport.session()); // configure passport to work with express-session



// API ROUTES
app.use('/api/v1', api);

// NO ROUTES FOUND
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ExpressError(404, 'PAGE NOT FOUND'));
});

// ERROR HANDLER
app.use((error: Error, req: Request, res: Response<FailedResponse>, next: NextFunction) => {
    const status_code = (error instanceof ExpressError) ? error.status : 500;
    const status_message = error.message || 'SERVER ERROR';
    const stack = process.env.NODE_ENV === 'development' ? error.stack : undefined;
    return res.status(status_code).json({
        success: false,
        status_code,
        status_message,
        stack
    });
});

export default app;