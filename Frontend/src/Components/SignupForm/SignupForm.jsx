import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Alert, AlertTitle } from '@mui/material';
import './SignupForm.css';
import { loginFailure, loginSuccess } from '../../redux-store/actions';
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';
import { isEmptyObject, signupUser } from '../../services/services';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const SignupForm = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const queryParams = Object.fromEntries(searchParams.entries());

	const handleSignup = async (e) => {
		e.preventDefault();
		const data = {
			userName: username,
			email: email,
			password
		};
		let result = await signupUser(data);
		if (result?.data?.status) {
			dispatch(loginSuccess(result.data.user, result.data.token));
			setError('');
			navigate('/home');
		} else {
			dispatch(loginFailure('error signing in user'));
			setError(result.response.data.message);
		}
	};

	useEffect(() => {
		dispatch(loginSuccess(queryParams.user, queryParams.token));
		setError('');
		navigate('/home');
	}, [!isEmptyObject(queryParams)]);

	const handleGoogleSignIn = (e) => {};

	return (
		<Box className="signup-form-container">
			<>
				{error.length > 0 && (
					<Alert severity="error">
						<AlertTitle>Error</AlertTitle>
						{error} — <strong>check it out!</strong>
					</Alert>
				)}
			</>
			<form onSubmit={handleSignup}>
				<TextField id="outlined-username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
				<TextField id="outlined-email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
				<TextField id="outlined-password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
				<TextField
					id="outlined-confirm-password"
					label="Confirm Password"
					variant="outlined"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button variant="contained" type="submit">
					Sign Up
				</Button>
				<GoogleSignInButton onClick={handleGoogleSignIn} />
			</form>
		</Box>
	);
};

export default SignupForm;
