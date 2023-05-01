/* eslint-disable react/prop-types */
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ToggleColorMode({ children }) {
	const [mode, setMode] = React.useState(
		// Read the user's preferred mode from local storage, defaulting to 'light'
		localStorage.getItem('mode') || 'light'
	);
	const [checked, setChecked] = React.useState(mode === 'dark');
	// This is the same as using : const [checked, setChecked] = React.useState(mode === 'dark' ? true : false);
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				// Toggle between 'light' and 'dark' mode
				const nextMode = mode === 'light' ? 'dark' : 'light';
				setMode(nextMode);
				setChecked(nextMode === 'dark');
				// Update local storage with the user's new preference
				localStorage.setItem('mode', nextMode);
			},
		}),
		[mode]
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider
			value={React.useMemo(
				() => ({ colorMode, checked }),
				[colorMode, checked]
			)}
		>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default ColorModeContext;
