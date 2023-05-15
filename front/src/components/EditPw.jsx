/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PasswordInput from './Form/PasswordInput';
import NewPasswordInput from './Form/NewPasswordInput';
import ConfirmNewPasswordInput from './Form/ConfirmNewPasswordInput';

export default function EditPw({
	password,
	confirmNewPassword,
	setPassword,
	setNewPassword,
	setConfirmNewPassword,
	cancel,
	incorrectPassword,
	setIncorrectPassword,
	setWrongPasswords,
	newPassword,
	isInputValid,
	wrongPasswords,
}) {
	return (
		<Container
			sx={{
				width: {
					xs: '90%',
					sm: '80%',
					md: '80%',
					lg: '80%',
					xl: '60%',
				},
			}}
		>
			<PasswordInput
				setPassword={setPassword}
				setIncorrectPassword={setIncorrectPassword}
				setWrongPasswords={setWrongPasswords}
				password={password}
				incorrectPassword={incorrectPassword}
			/>

			<NewPasswordInput
				setNewPassword={setNewPassword}
				setIncorrectPassword={setIncorrectPassword}
				setWrongPasswords={setWrongPasswords}
				newPassword={newPassword}
				isInputValid={isInputValid}
				wrongPasswords={wrongPasswords}
			/>
			<ConfirmNewPasswordInput
				setIncorrectPassword={setIncorrectPassword}
				setWrongPasswords={setWrongPasswords}
				setConfirmNewPassword={setConfirmNewPassword}
				confirmNewPassword={confirmNewPassword}
				wrongPasswords={wrongPasswords}
			/>

			<Button
				sx={{
					width: '100%',
					marginRight: '4px',
					backgroundColor: '#CB8EC8',
					marginTop: 2,
				}}
				variant="contained"
				onClick={() => {
					setPassword('');
					setNewPassword('');
					setConfirmNewPassword('');
					cancel();
				}}
			>
				Annuler
			</Button>
		</Container>
	);
}
