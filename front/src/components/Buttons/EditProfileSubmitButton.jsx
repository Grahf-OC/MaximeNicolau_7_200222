import React from 'react';
import Button from '@mui/material/Button';

export default function EditProfileSubmitButton({
	handleSubmit,
	editProfil,
	isToggled,
}) {
	return (
		<Button
			sx={{
				width: '30%',
				marginRight: '4px',
			}}
			variant="contained"
			onClick={isToggled ? (e) => handleSubmit(e) : () => editProfil()}
		>
			{isToggled ? 'Terminer' : 'Modifier'}
		</Button>
	);
}
