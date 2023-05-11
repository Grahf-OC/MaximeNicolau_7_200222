/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import UploadProfileImageButton from './UploadProfileImageButton';

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
				<FormControl fullWidth>
					<InputLabel htmlFor="Prénom">Prénom</InputLabel>
					<OutlinedInput
						sx={{ mb: 2 }}
						id="Prénom"
						placeholder={firstName}
						name="firstName"
						onChange={(e) => handleChange(e)}
						value={firstName}
						label="Prénom"
					/>
				</FormControl>
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
			</Container>
		</Box>
	);
}
