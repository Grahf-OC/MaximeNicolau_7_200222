/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import '../styles/index.css';
// import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/* const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
})); */

export default function ProfilComponent({ picture, firstName, email, isUser }) {
	return (
		<Box>
			<Card>
				<Container sx={{ display: 'flex', justifyContent: 'center' }}>
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
				<CardContent>
					<Typography
						align="center"
						color="secondary"
						gutterBottom
						sx={{ fontSize: 20 }}
					>
						<b>Prénom</b>
					</Typography>
					<Typography align="center" variant="h5" gutterBottom>
						{firstName}
					</Typography>
					{isUser && (
						<CardContent>
							<Typography
								align="center"
								color="secondary"
								gutterBottom
								sx={{ fontSize: 20 }}
							>
								<b>Email</b>
							</Typography>
							<Typography align="center" variant="h5" gutterBottom>
								{email}
							</Typography>
						</CardContent>
					)}
				</CardContent>
			</Card>
		</Box>
	);
}
