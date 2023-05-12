import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput } from '@mui/material';

export default function EmailInput({ email, handleChange }) {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="email">Email</InputLabel>
			<OutlinedInput
				type="email"
				id="email"
				placeholder={email}
				name="email"
				onChange={(e) => handleChange(e)}
				value={email}
				label="Email"
			/>
		</FormControl>
	);
}
