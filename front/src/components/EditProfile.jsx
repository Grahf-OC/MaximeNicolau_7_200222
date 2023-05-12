/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
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
					marginTop: '10px',
				}}
			>
				<CardMedia
					sx={{
						maxWidth: 200,
						marginBottom: '10px',
					}}
					component="img"
					height="240"
					image={picture}
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
						lg: '50%',
						xl: '40%',
					},
				}}
			>
				<FirstNameInput firstName={firstName} handleChange={handleChange} />

				<EmailInput email={email} handleChange={handleChange} />
			</Container>
		</Box>
	);
}
