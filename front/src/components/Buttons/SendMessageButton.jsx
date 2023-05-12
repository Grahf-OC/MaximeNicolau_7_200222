import React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

export default function SendMessageButton({ handleSubmit }) {
	return (
		<>
			<InputLabel htmlFor="send-message" />
			<Button
				sx={{ width: '15%', ml: 1 }}
				id="send-message"
				variant="contained"
				type="submit"
				onClick={(e) => handleSubmit(e)}
			>
				Publier
			</Button>
		</>
	);
}
