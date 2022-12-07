import { APPLY_THEME } from './types';

export const applyTheme = (theme: any) => {
	return {
		type: APPLY_THEME,
		payload: theme,
	};
};
