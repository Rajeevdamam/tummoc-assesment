// authMiddleware.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secretKey } from './config.js';
import User from './Model/userSchema.js';

// Configure JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secretKey
};

// This code sets up the JWT strategy using passport.use() middleware. It creates a new instance of JwtStrategy with the provided options (jwtOptions).
passport.use(
	new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
		try {
			// Check if user exists in the database
			const user = await User.findById(jwtPayload.id);
			if (!user) {
				return done(null, false);
			}
			// Pass the user to the route
			return done(null, user);
		} catch (error) {
			return done(error, false);
		}
	})
);

// Middleware to handle user authentication
export const authenticateUser = (req, res, next) => {
	// since we are using JWT authentication here instead of session based auth we are setting the session as false
	passport.authenticate('jwt', { session: false })(req, res, next);
};
