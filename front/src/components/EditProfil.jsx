/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CardMedia from '@mui/material/CardMedia';
import { OutlinedInput } from '@mui/material';

const Input = styled('input')({
	display: 'none',
});

export default function EditProfil({ firstName, email, picture, onChange }) {
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
				<Container>
					<FormControl fullWidth>
						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, fontsize: 10 }}
						>
							Prénom:
						</Typography>
						<OutlinedInput
							type="firstName"
							placeholder={firstName}
							name="firstName"
							onChange={onChange}
							value={firstName}
						/>
						<Typography
							gutterBottom
							variant="h6"
							size="10"
							component="div"
							sx={{ marginLeft: 2, fontsize: 10 }}
						>
							Email:
						</Typography>
						<OutlinedInput
							type="email"
							placeholder={email}
							name="email"
							onChange={onChange}
							value={email}
						/>
					</FormControl>
				</Container>
			</Container>
		</Box>
	);
}