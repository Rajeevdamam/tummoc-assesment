import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleAuthConfig } from '../config.js';
import User from '../Model/userSchema.js';

// Configure the Google strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: googleAuthConfig.clientID,
			clientSecret: googleAuthConfig.clientSecret,
			callbackURL: googleAuthConfig.callbackURL,
			passReqToCallback: true
		},
		(request, accessToken, refreshToken, profile, done) => {
			// The 'done' function should be called to indicate a successful authentication
			if (profile) {
				return done(null, profile);
			}
			return done({ error: 'No profile found' });
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

export default passport;
