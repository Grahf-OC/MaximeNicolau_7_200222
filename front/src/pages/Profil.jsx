/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import EditProfil from '../components/EditProfil';
import EditPw from '../components/EditPw';
import ProfilComponent from '../components/ProfilComponent';
import useAuth from '../hooks/useAuth';

const axios = require('axios');

export default function Profil() {
	const { id } = useParams();
	const { setAuth, auth } = useAuth();
	const [user, setUser] = React.useState({});
	const [changePw, setChangePw] = React.useState(false);
	const [password, setPassword] = React.useState('');
	const [newPw, setNewPw] = React.useState('');
	const [confirmNewPw, setConfirmNewPw] = React.useState('');
	const [wrongPasswords, setWrongPasswords] = React.useState('');
	const [incorrectPassword, setIncorrectPassword] = React.useState('');
	const [securedPassword, setSecuredPassword] = React.useState(false);
	const [isToggled, setIsToggled] = React.useState(false);
	const [isUser, setIsUser] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);
	const authToken = auth.token || {};
	const userUrl = `http://localhost:3000/api/user/${id}`;
	const confirm = useConfirm();
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	/* Récupération des infos de l'utilisateur, qu'on stocke dans le state user. On vérifie en même temps si l'utilisateur 
demandant la page du profil est le propriétaire ou l'admin, et on stocke le résultat dans isUser. Cela permet d'afficher
ou non les boutons pour modifier le profil, ainsi que l'adresse mail. */

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

	// Suppression du compte avec choix avant de confirmer, et logout après confirmation. Si l'admin supprime le compte, il n'est pas déconnecté.

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
			setRefresh((prev) => !prev);
			navigate('/');
			if (auth.user.isAdmin === false) {
				localStorage.clear();
				setAuth({});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const editProfil = () => setIsToggled((prev) => !prev);
	const editPw = () => setChangePw((prev) => !prev);

	function handleChange(e) {
		const { name, value, type, files } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: type === 'file' ? files[0] : value,
		}));
	}

	// Modification de l'email, du prénom ainsi que de la photo de profil.

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
			setRefresh((prev) => !prev);
		} catch (error) {
			console.log(error);
		}
		setIsToggled((prev) => !prev);
	};

	// Vérification de la force du mot de passe.

	const isInputValid = (regex, e) => {
		console.log(e);
		if (regex.test(e)) {
			return setSecuredPassword(true);
		}
		return setSecuredPassword(false);
	};

	// Envoi du nouveau mot de passe, après avoir vérifié l'ancien mdp, et la force du nouveau mdp.

	const submitNewPw = async (e) => {
		e.preventDefault();

		if (newPw === confirmNewPw) {
			if (securedPassword === true) {
				try {
					const config = {
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					};
					const form = { password, newPw };
					const result = await axios.put(
						`http://localhost:3000/api/user/${id}/password`,
						form,
						config
					);
					setRefresh((prev) => !prev);
					setChangePw((prev) => !prev);
					return console.log(result);
				} catch (error) {
					console.log(error);
					return setIncorrectPassword('Mot de passe incorrect');
				}
			}
			return alert(
				'Au moins 8 caractères, une majuscule, un chiffre et un caractère spécial'
			);
		}
		console.log('Passwords do not match');
		return setWrongPasswords('Mots de passe non identiques');
	};

	return (
		<Stack direction={matches ? 'row' : 'column'}>
			<Header />
			<Container>
				<Card>
					<CardContent>
						<Typography
							variant="h4"
							color="#FD2D01"
							sx={{ textAlign: 'center' }}
						>
							Vos informations
						</Typography>
					</CardContent>
				</Card>
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
					!changePw && (
						<ProfilComponent
							key={user.id}
							picture={user.picture}
							firstName={user.firstName}
							email={user.email}
							isUser={isUser}
						/>
					)
				)}
				{changePw && (
					<EditPw
						key={user.id}
						password={password}
						setPassword={setPassword}
						newPw={newPw}
						setNewPw={setNewPw}
						confirmNewPw={confirmNewPw}
						setConfirmNewPw={setConfirmNewPw}
						cancel={() => editPw()}
						wrongPasswords={wrongPasswords}
						setWrongPasswords={setWrongPasswords}
						incorrectPassword={incorrectPassword}
						setIncorrectPassword={setIncorrectPassword}
						isInputValid={(regex, e) => isInputValid(regex, e)}
					/>
				)}
				<Container
					sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
				>
					{isUser && !changePw && (
						<Button
							sx={{ width: '30%', marginRight: '4px' }}
							variant="contained"
							onClick={isToggled ? handleSubmit : editProfil}
						>
							{isToggled ? 'Terminer' : 'Modifier'}
						</Button>
					)}
					{isUser && !isToggled && !changePw && (
						<Button
							sx={{
								width: '30%',
								marginRight: '4px',
								backgroundColor: '#FD2D01',
							}}
							variant="contained"
							onClick={handleDelete}
						>
							Supprimer le compte
						</Button>
					)}
					{isUser && !isToggled && (
						<Button
							sx={{
								width: '30%',
								marginRight: '4px',
							}}
							variant="contained"
							onClick={changePw ? submitNewPw : editPw}
						>
							{changePw ? 'Terminer' : 'Changer de mot de passe'}
						</Button>
					)}
				</Container>
			</Container>
		</Stack>
	);
}
