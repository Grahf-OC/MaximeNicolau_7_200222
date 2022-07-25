/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CardMedia from '@mui/material/CardMedia';

const Input = styled('input')({
	display: 'none',
});

export default function EditProfil({ firstName, email, picture, onChange }) {
	return (
		<Box sx={{ marginTop: '100' }}>
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
				<label htmlFor="contained-button-file">
					<Input
						accept="image/*"
						id="contained-button-file"
						name="picture"
						type="file"
						onChange={onChange}
					/>
					<Button variant="contained" component="span">
						Photo de profil
					</Button>
				</label>
				<label htmlFor="icon-button-file">
					<IconButton
						color="primary"
						aria-label="upload picture"
						component="span"
					>
						<PhotoCamera />
					</IconButton>
				</label>
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
				<form className="form-profil">
					<input
						type="firstName"
						placeholder={firstName}
						className="form--input"
						name="firstName"
						onChange={onChange}
						value={firstName}
					/>

					<input
						type="email"
						placeholder={email}
						className="form--input"
						name="email"
						onChange={onChange}
						value={email}
					/>
				</form>
			</Container>
		</Box>
	);
}
