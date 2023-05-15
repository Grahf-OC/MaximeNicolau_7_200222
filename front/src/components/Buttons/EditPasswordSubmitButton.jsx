import React from 'react';
import Button from '@mui/material/Button';

export default function EditPasswordSubmitButton({
	submitNewPassword,
	editPw,
	changePw,
}) {
	return (
		<Button
			sx={{
				width: '30%',
				marginRight: '4px',
			}}
			variant="contained"
			onClick={changePw ? (e) => submitNewPassword(e) : () => editPw()}
		>
			{changePw ? 'Terminer' : 'Changer de mot de passe'}
		</Button>
	);
}
