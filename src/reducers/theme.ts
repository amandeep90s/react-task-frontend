import * as Themes from './../themes';
import { APPLY_THEME } from '../actions/types';

let themeColor = localStorage.getItem('themeColor') as string;
let themeObj;

if (themeColor === 'darkTheme') {
	themeObj = Themes.darkTheme;
} else if (themeColor === 'partyTheme') {
	themeObj = Themes.partyTheme;
} else {
	themeObj = Themes.lightTheme;
}

const initialState = {
	theme: themeObj,
};

const themeReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case APPLY_THEME:
			return Object.assign({}, { theme: action.payload });
		default:
			return state;
	}
};

export default themeReducer;
