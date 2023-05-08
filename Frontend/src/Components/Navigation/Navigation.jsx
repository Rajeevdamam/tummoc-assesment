import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../../redux-store/actions';
import './Navigation.css';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/services';

const Navigation = () => {
	const state = useSelector((state) => {
		return state;
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser(state.token);
		navigate('/signin');
		dispatch(logout());
	};

	const handleSignInNavigate = () => {
		navigate('/signin');
	};

	const handleSignUpNavigate = () => {
		navigate('/signup');
	};

	return (
		<div>
			<AppBar position="static" className="navbar">
				<Toolbar className="toolbar">
					<Typography variant="h6" className="navbar-title">
						{state?.success ? `Welcome, ${state?.user}!` : 'Check Your Auth'}
					</Typography>
					{!state?.success && (
						<Button color="inherit" onClick={handleSignInNavigate}>
							Sign In
						</Button>
					)}
					{!state?.success && (
						<Button color="inherit" onClick={handleSignUpNavigate}>
							Sign Up
						</Button>
					)}
					{state?.success && (
						<Button color="inherit" className="logout-button" onClick={handleLogout}>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navigation;
