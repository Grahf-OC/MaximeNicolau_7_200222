/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import UploadProfileImageButton from './Buttons/UploadProfileImageButton';
import FirstNameInput from './Form/FirstnameInput';
import EmailInput from './Form/EmailInput';

export default function EditProfil({
	firstName,
	email,
	picture,
	handleChange,
}) {
	return (
		<Box>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar
					sx={{
						width: 200,
						height: 200,
						mb: 3,
					}}
					src={picture}
					alt="Photo de profil"
				/>
				<UploadProfileImageButton handleChange={handleChange} />
			</Container>
			<Container
				sx={{
					width: {
						xs: '92%',
						sm: '70%',
						md: '70%',
						lg: '70%',
						xl: '60%',
					},
				}}
			>
				<FirstNameInput firstName={firstName} handleChange={handleChange} />

				<EmailInput email={email} handleChange={handleChange} />
			</Container>
		</Box>
	);
}
