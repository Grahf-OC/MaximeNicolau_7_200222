/* eslint-disable react/prop-types */
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export function ToggleColorMode({ children }) {
	const [mode, setMode] = React.useState('light');
	const [checked, setChecked] = React.useState(false);
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
				setChecked((prev) => !prev);
			},
		}),
		[]
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

	// const memoChecked = React.useMemo(() => checked, [checked]);

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
