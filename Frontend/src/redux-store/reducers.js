import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './redux-constants';

const initialState = {
	user: null,
	token: null,
	error: null,
	success: false
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...state, user: action.payload.user, token: action.payload.token, error: null, success: true };
		case LOGIN_FAILURE:
			return { ...state, error: action.payload, success: false };
		case LOGOUT:
			return { token: null, user: null, error: null, success: false };
		default:
			return state;
	}
};

export default authReducer;
