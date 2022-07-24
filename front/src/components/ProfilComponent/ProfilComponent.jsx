/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import '../../styles/index.css';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function ProfilComponent({ picture, firstName, email }) {
	return (
		<Box
			sx={{
				flexGrow: 1,
				marginTop: 2,
				width: 500,
			}}
		>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<CardMedia
					sx={{
						maxWidth: 200,
					}}
					component="img"
					height="240"
					image={picture}
					alt="Photo de profil"
				/>
			</Container>
			<Grid item xs={8}>
				<Item>
					<div className="profil-info">
						<p>Prénom</p>
						<h2>{firstName}</h2>
					</div>
				</Item>
			</Grid>

			<Grid item xs={8}>
				<Item>
					<div className="profil-info">
						<p>Email</p>
						<h2>{email}</h2>
					</div>
				</Item>
			</Grid>
		</Box>
	);
}
