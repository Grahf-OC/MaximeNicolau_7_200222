import React from 'react';
import Button from '@mui/material/Button';

export default function DeleteAccountButton({ handleDelete }) {
	return (
		<Button
			sx={{
				width: '30%',
				marginRight: '4px',
				backgroundColor: '#CB8EC8',
			}}
			variant="contained"
			onClick={() => handleDelete()}
		>
			Supprimer le compte
		</Button>
	);
}
