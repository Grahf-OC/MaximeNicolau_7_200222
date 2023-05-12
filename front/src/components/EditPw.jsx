/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PasswordInput from './Form/PasswordInput';
import NewPasswordInput from './Form/NewPasswordInput';
import ConfirmNewPasswordInput from './Form/ConfirmNewPasswordInput';

export default function EditPw({
	password,
	confirmNewPw,
	setPassword,
	setNewPw,
	setConfirmNewPw,
	cancel,
	incorrectPassword,
	setIncorrectPassword,
	setWrongPasswords,
	newPw,
	isInputValid,
	wrongPasswords,
}) {
	return (
		<Box sx={{ marginTop: '100' }}>
			<Container
				sx={{
					width: {
						xs: '92%',
						sm: '70%',
						md: '70%',
						lg: '50%',
						xl: '40%',
					},
				}}
			>
				<Container>
					<PasswordInput
						setPassword={setPassword}
						setIncorrectPassword={setIncorrectPassword}
						setWrongPasswords={setWrongPasswords}
						password={password}
						incorrectPassword={incorrectPassword}
					/>

					<NewPasswordInput
						setNewPw={setNewPw}
						setIncorrectPassword={setIncorrectPassword}
						setWrongPasswords={setWrongPasswords}
						newPw={newPw}
						isInputValid={isInputValid}
						wrongPasswords={wrongPasswords}
					/>
					<ConfirmNewPasswordInput
						setIncorrectPassword={setIncorrectPassword}
						setWrongPasswords={setWrongPasswords}
						setConfirmNewPw={setConfirmNewPw}
						confirmNewPw={confirmNewPw}
						wrongPasswords={wrongPasswords}
					/>
				</Container>
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
						setNewPw('');
						setConfirmNewPw('');
						cancel();
					}}
				>
					Annuler
				</Button>
			</Container>
		</Box>
	);
}
