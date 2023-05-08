import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:4000/api/v1/';

export const loginUser = async (data) => {
	try {
		let response = await axios.post(`${baseUrl}user/login`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
		return response;
	} catch (err) {
		return err;
	}
};

export const signupUser = async (data) => {
	try {
		let response = await axios.post(`${baseUrl}user/signup`, JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json' }
		});
		return response;
	} catch (err) {
		return err;
	}
};

export const logoutUser = async (token) => {
	try {
		let response = await axios.post(`${baseUrl}user/logout`, JSON.stringify({}), {
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
		});
		return response;
	} catch (err) {
		return null;
	}
};

export const isEmptyObject = (obj) => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
};

export const googleSignIn = async () => {
	window.location.href = `${baseUrl}user/auth/google/`;
};
