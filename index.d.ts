
import * as express from 'express-serve-static-core';

// Re-using namespace Express
declare global {
    namespace Express {
        // req.user
        export interface User {
            id: String;
            username: String;
            discordId: String;
            createdAt: NativeDate;
            updatedAt: NativeDate;
        }
    }
};
 
//export {}