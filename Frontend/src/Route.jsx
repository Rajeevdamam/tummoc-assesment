import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import { useSelector } from 'react-redux';
import Home from './Components/Home/Home';

const MainRoute = () => {
	const state = useSelector((state) => {
		return state;
	});

	return (
		<BrowserRouter>
			<Navigation />
			<div className="main-container">
				<Routes>
					<Route path="/signin" element={<LoginForm />} />
					<Route path="/" element={<Navigate to={state.success ? '/home' : '/signin'} />} />
					<Route path="/home" element={<Home />} />
					<Route path="/signup" element={<SignupForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default MainRoute;
