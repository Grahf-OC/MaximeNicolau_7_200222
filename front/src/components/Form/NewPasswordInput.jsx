import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, TextField } from '@mui/material';

export default function NewPasswordInput({
	setNewPw,
	setWrongPasswords,
	newPw,
	isInputValid,
	wrongPasswords,
}) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="newPw" />
			<TextField
				type="password"
				id="newPw"
				placeholder="Nouveau mot de passe"
				name="newPw"
				onChange={(e) => {
					setNewPw(e.target.value);
					setWrongPasswords('');
					isInputValid(
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
						e.target.value
					);
				}}
				value={newPw}
				label="Nouveau mot de passe"
				error={wrongPasswords !== ''}
				helperText={wrongPasswords}
			/>
		</FormControl>
	);
}
