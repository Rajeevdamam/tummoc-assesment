// user.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: [true, 'Email already exists!'],
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
});
// Hashing the password before saving to the database
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

// Comparing the password entered by the user during login
userSchema.methods.comparePassword = async function (candidatePass, userPass) {
	return await bcrypt.compare(candidatePass, userPass);
};

const userModel = mongoose.model('User', userSchema);
export default userModel;
