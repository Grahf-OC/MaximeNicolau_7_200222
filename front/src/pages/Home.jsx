/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { Link } from 'react-router-dom';

import '../styles/index.css';

import axios from 'axios';
import Login from '../components/Login/Login';

export default function Home() {
	const urlGetAll = 'http://localhost:3000/api/message';
	const authToken = localStorage.getItem('token') || {};

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(urlGetAll, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result);
		};
		fetchData();
	}, []);
	return (
		<div className="App">
			{' '}
			<Login />
		</div>
	);
}
