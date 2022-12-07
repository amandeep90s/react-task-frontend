import styled from 'styled-components';
import { darkTheme, lightTheme, partyTheme } from '../themes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { applyTheme } from '../actions/theme';
import { Navigate } from 'react-router-dom';
import { updateTheme } from '../actions/auth';

const StyledButton = styled.button`
	color: ${(props) => props.theme.theme.textColor};
	background-color: ${(props) => props.theme.theme.primary};
	box-shadow: none;
	border: 0px;
	border-radius: 4px;
	font-size: 1.2em;
	min-width: 120px;
	padding: 12px;
	margin: 12px;
	cursor: pointer;
`;
const ThemeSelector = () => {
	const dispatch = useAppDispatch();
	const { isLoggedIn } = useAppSelector((state: any) => state.auth);

	const changeTheme = (theme: any, themeColor: String) => {
		dispatch(applyTheme(theme));

		dispatch(
			updateTheme(themeColor, localStorage?.getItem('id')?.toString() || '')
		)
			.then(() => {
				localStorage.setItem('themeColor', themeColor.toString());
			})
			.catch(() => {});
	};

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}
	return (
		<div>
			<StyledButton onClick={() => changeTheme(darkTheme, 'darkTheme')}>
				Dark
			</StyledButton>
			<StyledButton onClick={() => changeTheme(lightTheme, 'lightTheme')}>
				Light
			</StyledButton>
			<StyledButton onClick={() => changeTheme(partyTheme, 'partyTheme')}>
				Party
			</StyledButton>
		</div>
	);
};
export default ThemeSelector;
