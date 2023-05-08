// authRoutes.js
import express from 'express';
import { signup, userSignin, logout, googleAuth } from '../Controller/userAuth.js';
import tryCatchHOC from '../utils/tryCatchHOC.js';
import passport from '../Controller/googleAuth.js';

const userRouter = express.Router();

// Route for user login
userRouter.post('/login', tryCatchHOC(userSignin));

// Route for user signup
userRouter.post('/signup', tryCatchHOC(signup));

// Route for user logout
userRouter.post('/logout', tryCatchHOC(logout));

// Route for google signin
userRouter.use(passport.initialize());
userRouter.get(
	'/auth/google/',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
		accessType: 'offline',
		prompt: 'consent'
	})
);
userRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), tryCatchHOC(googleAuth));

export default userRouter;
