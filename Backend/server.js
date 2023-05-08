import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectionToDB from './connectionToDB.js';
import userRouter from './Routes/userAuthRoute.js';
import cityRouter from './Routes/cityRoute.js';

dotenv.config();

const startServer = () => {
	const app = express();

	app.use(express.json());

	app.use(cors());

	const port = process.env.PORT || 4000;

	connectionToDB()
		.then(() => console.log('Connected to database'))
		.catch((err) => console.log(err));

	app.get('/', (req, res) => {
		res.json({ message: 'Protected route accessed successfully' });
	});

	app.use('/api/v1/user', userRouter);

	app.use('/api/v1/cities', cityRouter);

	app.listen(port, () => {
		console.log(`Server Running at port:${port}`);
	});
};

startServer();
