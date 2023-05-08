import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers';

const store = configureStore({
	reducer: authReducer
});

export default store;
