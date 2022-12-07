import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE,
	UPDATE_FAIL,
	UPDATE_SUCCESS,
} from './types';

import { signin, signout, update } from '../services/auth.service';

export const login = (email: String, password: String) => (dispatch: any) => {
	return signin(email, password).then(
		(data) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { user: data },
			});

			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: LOGIN_FAIL,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

export const updateTheme =
	(themeColor: String, id: String) => (dispatch: any) => {
		return update(themeColor, id).then(
			(data) => {
				dispatch({
					type: UPDATE_SUCCESS,
					payload: { user: data },
				});

				return Promise.resolve();
			},
			(error) => {
				const message =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				dispatch({
					type: UPDATE_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: message,
				});

				return Promise.reject();
			}
		);
	};

export const logout = () => (dispatch: any) => {
	signout();

	dispatch({
		type: LOGOUT,
	});
};
