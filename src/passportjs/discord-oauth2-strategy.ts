import passport from "passport";
import { Strategy as DiscordStrategy } from 'passport-discord';
import User from "../models/user.model";
import ExpressError from "../utils/ExpressError";

// Serialize - save a value to our express-session after successful login
passport.serializeUser((user, done) => {
    console.log(`## serializeUser`);
    done(null, user.id);
});

// Deserialize - get user id from session (when request is made and valid cookie exists)
passport.deserializeUser(async (userId, done) => {
    console.log(`## deserializeUser`);
    try {
        const user = await User.findById(userId);
        if (!user) throw new ExpressError(404, 'NOT_FOUND: User not found');
        done(null, user as Express.User);
    } catch(err) {
        done(err, false);
    }
});


const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const redirect_url = process.env.DISCORD_REDIRECT_CALLBACK_URL;
if (!clientId || !clientSecret || !redirect_url) throw new Error(`Please provide .env OAUTH2 Discord Configuration`);

// PASSPORT (discord strategy configuration)
export default passport.use(
    new DiscordStrategy(
        {
            clientID: clientId,
            clientSecret: clientSecret,
            // Example: http://localhost:3000/api/v1/auth/discord/redirect
            callbackURL: redirect_url,
            /**
            * define permissions that we have, BY DEFAULT WE do not have any user information
            * Scopes are defined different for each third-party:
            *       https://discord.com/developers/docs/topics/oauth2
            *       identify --> allows /users/@me without email
            *       email --> enables /users/@me to return an email
            *       guilds --> allows /users/@me/guilds to return basic information about all of a user's guilds
            **/
            scope: ['identify', 'guilds', 'email'], 
        }, 
        async (accessToken, refreshToken, profile, done) => {
            /**
             * Generates access and refresh tokens
             * from http://localhost:3000/api/v1/auth/discord/redirect?code=vzjsda5fakesd3moyfYtNV4qnTu (send from discord) to our redirect
             * */ 

            // profile object contains email(if enabled), guilds etcs
            console.dir(profile);
            try {
                let user = await User.findOne({ discordId : profile.id });
                if (!user) {
                    // Can also use await User.create({})
                    const newUser = new User({
                        username: profile.username,
                        discordId: profile.id,
                    });
                    user = await newUser.save();
                }
                done(null, user as Express.User);
            } catch(err) {
                done(err, false);
            }
        }
    )
);