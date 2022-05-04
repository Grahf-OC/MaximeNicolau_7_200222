/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/index.css';
import Login from '../components/Login';

export default function Home() {
	//	const getUsers = () => fetch('http://localhost:3000/api/user/');
	// const users = getUsers();
	// console.log(users);

	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		async function fetchData() {
			const result = await axios('http://localhost:3000/api/user/');

			setUsers(result.data);
		}
		fetchData();
	}, []);

	console.log(users);

	const liste = users.map((user) => (
		<li key={user.id}>
			<Link to={`profil/${user.id}`}>{user.firstName}</Link>
		</li>
	));

	return (
		<div className="App">
			<Login />
			<h1>Tous les utilisateurs</h1>
			<h2>{liste}</h2>
		</div>
	);
}

/* 

			<ul>
					{users.map(({ id, firstName }) => (
						<li key={id}>
							<Link to={`profil/${id}`}>{firstName}</Link>
						</li>
					))}
				</ul> 

*/
