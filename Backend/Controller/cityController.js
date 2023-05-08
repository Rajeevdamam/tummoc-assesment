import City from '../Model/citySchema.js';
import tryCatchHOC from '../utils/tryCatchHOC.js';

export const createCity = tryCatchHOC(async (req, res) => {
	const city = await City.create({
		name: req.body.name,
		user: req.body.user
	});

	res.status(200).json({
		status: 'success',
		city
	});
});

export const getAllCities = tryCatchHOC(async (req, res) => {
	const cities = await City.find();

	if (cities.length === 0)
		return res.status(404).json({
			status: false,
			message: 'No cities found!'
		});

	res.status(200).json({
		status: 'success',
		results: cities.length,
		data: cities
	});
});

export const getCity = tryCatchHOC(async (req, res) => {
	const city = await City.findById(req.params.id);

	if (!city)
		return res.status(404).json({
			status: false,
			message: 'No city found with that id!'
		});

	res.status(200).json({
		status: 'success',
		data: city
	});
});
