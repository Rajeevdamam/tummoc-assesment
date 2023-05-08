import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux-store/store';
import MainRoute from './Route';

const App = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<MainRoute />
			</div>
		</Provider>
	);
};

export default App;
