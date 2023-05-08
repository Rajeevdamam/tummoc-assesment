import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// we can either use local db connection or connection to mongoDB cloud cluster

const connectionToDB = () =>
	mongoose.connect('mongodb://localhost:27017/tummoc-db', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

export default connectionToDB;
