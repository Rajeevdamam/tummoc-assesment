import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'City name is Required']
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'City must have a user']
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

citySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'userName email'
	});
	next();
});

const City = mongoose.model('City', citySchema);

export default City;
