/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from '../components/Header/Header';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function Membres() {
	const authToken = localStorage.getItem('token');
	const [users, setUsers] = React.useState([]);
	// const userId = localStorage.getItem('userId');

	React.useEffect(() => {
		async function fetchData() {
			const result = await axios('http://localhost:3000/api/user/', {
				headers: { Authorization: `Bearer ${authToken}` },
			});

			setUsers(result.data);
		}
		fetchData();
	}, []);

	console.log(users);

	const liste = users.map((user) => (
		<li key={user.id}>
			<Link to={`/Profil/${user.id}`}>{user.firstName}</Link>
		</li>
	));

	return (
		<Stack direction="row" justifyContent="space-evenly">
			<Header />
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Item>
							<div className="Membres">
								<h1>Tous les utilisateurs</h1>
								<h2>{liste}</h2>
							</div>
						</Item>
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
}
