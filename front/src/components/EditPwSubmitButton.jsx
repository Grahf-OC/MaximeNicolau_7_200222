/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';

export default function EditPwSubmitButton({ submitNewPw, editPw, changePw }) {
	return (
		<Button
			sx={{
				width: '30%',
				marginRight: '4px',
			}}
			variant="contained"
			onClick={changePw ? (e) => submitNewPw(e) : () => editPw()}
		>
			{changePw ? 'Terminer' : 'Changer de mot de passe'}
		</Button>
	);
}
