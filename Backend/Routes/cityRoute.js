import express from 'express';
import passport from 'passport';
import '../authenticationMiddleware.js';
import { createCity, getAllCities, getCity } from '../Controller/cityController.js';

const cityRouter = express.Router();

// All the routes after this are protected by the passport JWT AUTH
cityRouter.use(passport.authenticate('jwt', { session: false }));

cityRouter.route('/').post(createCity);
cityRouter.route('/').get(getAllCities);
cityRouter.route('/:id').get(getCity);

export default cityRouter;
