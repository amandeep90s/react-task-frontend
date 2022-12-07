export default function authHeader() {
	const user = JSON.parse(localStorage.getItem('user') || '{}');

	if (Object.keys(user).length !== 0 && user?.token) {
		return { Authorization: 'Bearer ' + user.token };
	} else {
		return {};
	}
}
