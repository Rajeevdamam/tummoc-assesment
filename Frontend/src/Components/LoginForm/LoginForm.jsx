import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from '../../redux-store/actions';
import { Box, TextField, Button, Alert, AlertTitle } from '@mui/material';
import './LoginForm.css';
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';
import { googleSignIn, isEmptyObject, loginUser } from '../../services/services';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [searchParams] = useSearchParams();

	const dispatch = useDispatch();

	const queryParams = Object.fromEntries(searchParams.entries());

	const handleLogin = async (e) => {
		const data = {
			email: email,
			password
		};
		e.preventDefault();
		let result = await loginUser(data);
		if (result?.data?.status) {
			dispatch(loginSuccess(result.data.user, result.data.token));
			setError('');
			navigate('/home');
		} else {
			dispatch(loginFailure('error loggin in user'));
			setError(result.response.data.message);
		}
	};

	useEffect(() => {
		if (queryParams?.user?.length) {
			dispatch(loginSuccess(queryParams.user, queryParams.token));
			setError('');
			navigate('/home');
		}
	}, [!isEmptyObject(queryParams)]);

	const handleGoogleSignIn = (e) => {
		googleSignIn();
	};

	return (
		<Box className="login-form-container">
			<>
				{error.length > 0 && (
					<Alert severity="error">
						<AlertTitle>Error</AlertTitle>
						{error} — <strong>check it out!</strong>
					</Alert>
				)}
			</>
			<form onSubmit={handleLogin}>
				<TextField id="outlined-email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
				<TextField id="outlined-password" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
				<Button variant="contained" type="submit">
					Login
				</Button>
				<GoogleSignInButton onClick={handleGoogleSignIn} />
			</form>
		</Box>
	);
};

export default LoginForm;
