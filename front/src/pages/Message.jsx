/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Header from '../components/Header/Header';
import useAuth from '../hooks/useAuth';

const axios = require('axios');

export default function Profil() {
	const { auth } = useAuth();
	const authToken = auth.token || {};
	const { id } = useParams();
	const [message, setMessage] = React.useState([]);

	const messageUrl = `http://localhost:3000/api/message/${id}`;

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(messageUrl, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result);

			setMessage(result.data.message);
		};

		fetchData();
	}, []);

	return (
		<Stack direction="row" justifyContent="space-evenly">
			<Header />
			<div>
				<Container>
					<p>{message.body}</p>
				</Container>
			</div>
		</Stack>
	);
}
