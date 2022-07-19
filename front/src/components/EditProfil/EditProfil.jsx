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
import Stack from '@mui/material/Stack';

const Input = styled('input')({
	display: 'none',
});

export default function EditProfil({
	firstName,
	lastName,
	email,

	onChange,
}) {
	return (
		<Container>
			<div className="form-container">
				<Stack direction="row" alignItems="center" spacing={1}>
					<label htmlFor="contained-button-file">
						<Input
							accept="image/*"
							id="contained-button-file"
							name="picture"
							type="file"
							onChange={onChange}
						/>
						<Button variant="contained" component="span">
							Upload
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
				</Stack>
				<form className="form">
					<input
						type="firstName"
						placeholder={firstName}
						className="form--input"
						name="firstName"
						onChange={onChange}
						value={firstName}
					/>

					<input
						type="lastName"
						placeholder={lastName}
						className="form--input"
						name="lastName"
						onChange={onChange}
						value={lastName}
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
			</div>
		</Container>
	);
}
