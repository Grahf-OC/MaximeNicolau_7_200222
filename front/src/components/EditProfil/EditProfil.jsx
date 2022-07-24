/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CardMedia from '@mui/material/CardMedia';

const Input = styled('input')({
	display: 'none',
});

export default function EditProfil({ firstName, email, picture, onChange }) {
	return (
		<Container>
			<CardMedia
				sx={{
					maxWidth: 200,
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
	);
}
