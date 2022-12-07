import { useEffect, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import './App.css';

import ThemeSelector from './components/ThemeSelector';
import Login from './components/Login';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: any) => props.theme.theme.backgroundColor}
  }
`;

const StyledH1 = styled.h1`
	color: ${(props: any) => props.theme.theme.primary};
`;

function App() {
	const dispatch = useAppDispatch();
	let location = useLocation();
	const { user: currentUser } = useAppSelector((state: any) => state.auth);
	const theme = useAppSelector((state: any) => state.theme);

	useEffect(() => {
		if (['/login'].includes(location.pathname)) {
			dispatch(clearMessage()); // clear message when changing location
		}
	}, [dispatch, location]);

	const logOut = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<nav className='navbar navbar-expand navbar-dark bg-dark px-3'>
					<div className='navbar-nav me-auto'>
						<li className='nav-item'>
							<Link to={'/'} className='nav-link'>
								Home
							</Link>
						</li>
					</div>

					{currentUser ? (
						<div className='navbar-nav ml-auto'>
							<li className='nav-item'>{currentUser.name}</li>
							<li className='nav-item'>
								<a href='/login' className='nav-link' onClick={logOut}>
									LogOut
								</a>
							</li>
						</div>
					) : (
						<div className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<Link to={'/login'} className='nav-link'>
									Login
								</Link>
							</li>
						</div>
					)}
				</nav>

				<div className='container mt-3 App-header'>
					<GlobalStyle />
					<StyledH1>React Color Preference Demo</StyledH1>
					<Routes>
						<Route path='/' element={<ThemeSelector />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
