import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, TextField } from '@mui/material';

export default function NewPasswordInput({
	setNewPassword,
	setWrongPasswords,
	newPassword,
	isInputValid,
	wrongPasswords,
}) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="newPassword" />
			<TextField
				sx={{ mb: 2 }}
				type="password"
				id="newPassword"
				placeholder="Nouveau mot de passe"
				name="newPassword"
				onChange={(e) => {
					setNewPassword(e.target.value);
					setWrongPasswords('');
					isInputValid(
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
						e.target.value
					);
				}}
				value={newPassword}
				label="Nouveau mot de passe"
				error={wrongPasswords !== ''}
				helperText={wrongPasswords}
			/>
		</FormControl>
	);
}
