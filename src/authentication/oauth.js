import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import AuthorModel from "../Authors/Schema.js";
import { JWTAuthenticate } from "./tools.js";

const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_ID,
        clientSecret: process.env.GOOGLE_OAUTH_SECRET,
        callbackURL: `${process.env.API_URL}/users/googleRedirect`,
    },
    async(accessToken, profile, passportNext) => {
        try {
            console.log("PROFILE", profile);
            const user = await AuthorModel.findOne({ googleId: profile.id }); //is user in DB?
            if (user) {
                const token = await JWTAuthenticate(user);
                passportNext(null, { token }); //attaches tokens to req.user --> req.user.tokens
            } else {
                const newAuthor = new AuthorModel({
                    name: profile.name.givenName,
                    surname: profile.name.familyName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                });
                const savedAuthor = await newAuthor.save();
                const token = await JWTAuthenticate(savedAuthor);
                passportNext(null, { token });
            }
        } catch (error) {
            passportNext(null, { token });
        }
    }
);

passport.serializeUser(function(data, passportNext) {
    passportNext(null, data);
});

export default googleStrategy