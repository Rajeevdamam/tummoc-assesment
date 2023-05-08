import dotenv from 'dotenv';
dotenv.config();

export const secretKey = process.env.SECRET_KEY;
export const expiresIn = process.env.EXPIRES_IN;

export const googleAuthConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: 'http://localhost:4000/api/v1/user/auth/google/callback'
};

export const BASE_URL = 'http://localhost:3000';
