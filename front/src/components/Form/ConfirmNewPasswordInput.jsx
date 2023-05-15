import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, TextField } from '@mui/material';

export default function ConfirmNewPasswordInput({
	setConfirmNewPassword,
	setWrongPasswords,
	confirmNewPassword,
	wrongPasswords,
}) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="confirmNewPassword" />
			<TextField
				type="password"
				id="confirmNewPassword"
				placeholder="Confirmer nouveau mot de passe"
				name="confirmNewPassword"
				onChange={(e) => {
					setConfirmNewPassword(e.target.value);
					setWrongPasswords('');
				}}
				value={confirmNewPassword}
				label="Confirmer nouveau mot de passe"
				error={wrongPasswords !== ''}
				helperText={wrongPasswords}
			/>
		</FormControl>
	);
}
