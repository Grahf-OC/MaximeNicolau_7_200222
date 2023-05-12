import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, TextField } from '@mui/material';

export default function ConfirmNewPasswordInput({
	setConfirmNewPw,
	setWrongPasswords,
	confirmNewPw,
	wrongPasswords,
}) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="confirmNewPw" />
			<TextField
				type="password"
				id="confirmNewPw"
				placeholder="Confirmer nouveau mot de passe"
				name="confirmNewPw"
				onChange={(e) => {
					setConfirmNewPw(e.target.value);
					setWrongPasswords('');
					console.log(wrongPasswords);
				}}
				value={confirmNewPw}
				label="Confirmer nouveau mot de passe"
				error={wrongPasswords !== ''}
				helperText={wrongPasswords}
			/>
		</FormControl>
	);
}
