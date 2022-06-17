/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../components/Header/Header';

import EditProfil from '../components/EditProfil/EditProfil';
import ProfilComponent from '../components/Profil/Profil';

const axios = require('axios');

export default function Profil() {
	const authToken = localStorage.getItem('token');
	const { id } = useParams();
	const [user, setUser] = React.useState({});
	const [isToggled, setIsToggled] = React.useState(false);
	const [isUser, setIsUser] = React.useState(false);
	const userUrl = `http://localhost:3000/api/user/${id}`;

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(userUrl, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result);

			setUser(result.data.user);
			const myUser = JSON.parse(localStorage.getItem('myUser'));
			if (result.data.user.id === myUser.id) {
				setIsUser(true);
			}
		};
		fetchData();
	}, [id, isToggled]);

	const editProfil = () => setIsToggled((prev) => !prev);

	function handleChange(e) {
		const { name, value, type, files } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: type === 'file' ? files[0] : value,
		}));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('user', JSON.stringify(user));
			formData.append('image', user.picture);

			const config = {
				headers: {
					'content-type': 'multipart/form-data',
					Authorization: `Bearer ${authToken}`,
				},
			};

			const result = await axios.put(
				`http://localhost:3000/api/user/${id}`,
				formData,
				config
			);
			console.log(result.data);
			console.log(user);

			localStorage.setItem('myUser', JSON.stringify(result.data.user));
		} catch (error) {
			console.log(error);
		}

		setIsToggled((prev) => !prev);
	};

	return (
		<Stack direction="row" justifyContent="space-evenly">
			<Header />
			<Container>
				<div className="profil-container">
					<h1>Informations Personnelles</h1>
					{isUser && (
						<Button
							variant="contained"
							onClick={isToggled ? handleSubmit : editProfil}
						>
							{isToggled ? 'Terminer' : 'Modifier'}
						</Button>
					)}
					{isToggled ? (
						<EditProfil
							key={user.id}
							picture={user.picture}
							firstName={user.firstName}
							lastName={user.lastName}
							email={user.email}
							birthday={user.birthday}
							password={user.password}
							onChange={(e) => handleChange(e)}
						/>
					) : (
						<ProfilComponent
							key={user.id}
							picture={user.picture}
							firstName={user.firstName}
							lastName={user.lastName}
							email={user.email}
							birthday={user.birthday}
						/>
					)}
				</div>
			</Container>
		</Stack>
	);
}
