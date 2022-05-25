/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Header from '../components/Header/Header';

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
			<Container>
				<div className="Membres">
					<h1>Tous les utilisateurs</h1>
					<h2>{liste}</h2>
				</div>
			</Container>
		</Stack>
	);
}
