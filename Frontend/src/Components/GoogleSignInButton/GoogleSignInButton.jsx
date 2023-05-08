import React from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import './GoogleSignInButton.css';

const GoogleSignInButton = ({ onClick }) => {
	return (
		<Button className="outlined-google-button" variant="outlined" startIcon={<Google />} onClick={onClick}>
			Sign in with Google
		</Button>
	);
};

export default GoogleSignInButton;
