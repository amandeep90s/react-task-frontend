import axios from 'axios';
import jwt_decode from 'jwt-decode';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/v1/';

export const signin = (email: String, password: String) => {
	return axios
		.post(API_URL + 'login', {
			email,
			password,
		})
		.then((response) => {
			if (response.data.token) {
				const token: any = jwt_decode(response.data.token);
				localStorage.setItem('user', JSON.stringify(response.data));
				localStorage.setItem('id', token.id);
				localStorage.setItem('themeColor', token.themeColor);
			}

			return response.data;
		});
};

export const update = (themeColor: String, id: String) => {
	return axios
		.patch(
			API_URL + 'users/' + id,
			{
				themeColor,
			},
			{ headers: authHeader() }
		)
		.then((response) => {
			if (response.data.status === 'sucess') {
				localStorage.setItem('themeColor', themeColor.toString());
			}

			return response.data;
		});
};

export const signout = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('id');
	localStorage.removeItem('themeColor');
};
