/* eslint-disable no-console */
import React from 'react';
import '../styles/index.css';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfilComponent({ picture, firstName, email, isUser }) {
	return (
		<Box>
			<Card>
				<Container sx={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar
						sx={{
							width: 200,
							height: 200,
						}}
						src={picture}
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
