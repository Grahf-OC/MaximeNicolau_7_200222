import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, TextField } from '@mui/material';

export default function PasswordInput({
	setPassword,
	setIncorrectPassword,
	password,
	incorrectPassword,
}) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="password" />
			<TextField
				sx={{ mt: 2 }}
				type="password"
				id="password"
				placeholder="Mot de passe actuel"
				name="password"
				onChange={(e) => {
					setPassword(e.target.value);
					setIncorrectPassword('');
				}}
				value={password}
				label="Mot de passe"
				error={incorrectPassword !== ''}
				helperText={incorrectPassword}
			/>
		</FormControl>
	);
}
