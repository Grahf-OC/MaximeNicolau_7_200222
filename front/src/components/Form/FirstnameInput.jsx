import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput } from '@mui/material';

export default function FirstNameInput({ firstName, handleChange }) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="Prénom">Prénom</InputLabel>
			<OutlinedInput
				sx={{ mb: 2 }}
				id="Prénom"
				placeholder={firstName}
				name="firstName"
				onChange={(e) => handleChange(e)}
				value={firstName}
				label="Prénom"
			/>
		</FormControl>
	);
}
