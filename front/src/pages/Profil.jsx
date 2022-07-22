/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../components/Header/Header';
import EditProfil from '../components/EditProfil/EditProfil';
import ProfilComponent from '../components/Profil/Profil';
import useAuth from '../hooks/useAuth';

const axios = require('axios');

export default function Profil() {
	const authToken = localStorage.getItem('token');
	const { id } = useParams();
	const [user, setUser] = React.useState({});
	const [isToggled, setIsToggled] = React.useState(false);
	const [isUser, setIsUser] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);
	const { setAuth, auth } = useAuth();
	const userUrl = `http://localhost:3000/api/user/${id}`;
	const confirm = useConfirm();
	const navigate = useNavigate();

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(userUrl, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result);

			setUser(result.data.user);

			if (result.data.user.id === auth.user.id || auth.user.isAdmin === true) {
				setIsUser(true);
			}
		};
		fetchData();
	}, [id, isToggled, refresh]);

	const handleDelete = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};
		try {
			await confirm({
				title: 'Êtes-vous sûr?',
				description: 'Supprimer le compte? Cette action est irréversible',
			});
			axios.delete(`http://localhost:3000/api/user/${id}`, config);
			setAuth({});
			localStorage.clear();
			setRefresh((prev) => !prev);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

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
			formData.append('email', JSON.stringify(user.email));
			formData.append('firstName', JSON.stringify(user.firstName));
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
			setRefresh((prev) => !prev);

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
					{isUser && !isToggled && (
						<Button
							variant="contained"
							onClick={handleDelete}
							sx={{ marginLeft: 5 }}
						>
							Supprimer le compte
						</Button>
					)}

					{isToggled ? (
						<EditProfil
							key={user.id}
							picture={user.picture}
							firstName={user.firstName}
							email={user.email}
							toggled={isToggled}
							onChange={(e) => handleChange(e)}
						/>
					) : (
						<ProfilComponent
							key={user.id}
							picture={user.picture}
							firstName={user.firstName}
							email={user.email}
						/>
					)}
				</div>
			</Container>
		</Stack>
	);
}
