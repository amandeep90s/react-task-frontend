import {
	UPDATE_SUCCESS,
	UPDATE_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user') || '{}');

const initialState =
	Object.keys(user).length !== 0
		? { isLoggedIn: true, user }
		: { isLoggedIn: false, user: null };

export default function auth(state = initialState, action: any) {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
			};
		case UPDATE_FAIL:
			return {
				...state,
				isLoggedIn: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
}
