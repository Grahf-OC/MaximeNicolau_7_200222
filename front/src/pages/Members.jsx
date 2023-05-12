/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function Membres() {
	const { auth } = useAuth();
	const authToken = auth.token || {};
	const [users, setUsers] = React.useState([]);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

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
			<Link to={`/profil/${user.id}`}>{user.firstName}</Link>
		</li>
	));

	return (
		<Stack direction={matches ? 'row' : 'column'}>
			<Header />
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Item>
							<div className="Membres">
								<h1 className="error">Tous les utilisateurs</h1>
								<h2>{liste}</h2>
							</div>
						</Item>
					</Grid>
				</Grid>
			</Container>
		</Stack>
	);
}
