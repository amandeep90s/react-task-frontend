import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Navigate, useNavigate } from 'react-router-dom';

import { login } from '../actions/auth';

const Login = (props: any) => {
	let navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const { isLoggedIn } = useAppSelector((state: any) => state.auth);
	const { message } = useAppSelector((state: any) => state.message);
	const theme = useAppSelector((state: any) => state.theme);

	const dispatch = useAppDispatch();

	const onChangeEmail = (e: any) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e: any) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleLogin = (e: any) => {
		e.preventDefault();

		setLoading(true);

		dispatch(login(email, password))
			.then(() => {
				window.location.reload();
				navigate('/');
			})
			.catch(() => {
				setLoading(false);
			});
	};

	if (isLoggedIn) {
		return <Navigate to='/' />;
	}

	return (
		<div className='d-flex justify-content-center align-items-center w-50'>
			<div className='col-md-12'>
				<form onSubmit={handleLogin} method='POST'>
					<div className='mb-3'>
						<label htmlFor='email' style={{ color: theme.theme.textColor }}>
							Email
						</label>
						<input
							type='email'
							className='form-control'
							name='email'
							value={email}
							onChange={onChangeEmail}
							required={true}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='password' style={{ color: theme.theme.textColor }}>
							Password
						</label>
						<input
							type='password'
							className='form-control'
							name='password'
							value={password}
							onChange={onChangePassword}
							required={true}
						/>
					</div>

					<div className='mb-3'>
						<button className='btn btn-primary btn-block' disabled={loading}>
							{loading && (
								<span className='spinner-border spinner-border-sm'></span>
							)}
							<span style={{ color: theme.theme.textColor }}>Login</span>
						</button>
					</div>

					{message && (
						<div className='form-group'>
							<div className='alert alert-danger' role='alert'>
								{message}
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
