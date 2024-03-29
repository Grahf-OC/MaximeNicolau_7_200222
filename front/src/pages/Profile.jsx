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
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import EditProfile from '../components/EditProfile';
import EditPw from '../components/EditPw';
import ProfileComponent from '../components/ProfileComponent';
import useAuth from '../hooks/useAuth';
import DeleteAccountButton from '../components/Buttons/DeleteAccountButton';
import EditProfileSubmitButton from '../components/Buttons/EditProfileSubmitButton';
import EditPasswordSubmitButton from '../components/Buttons/EditPasswordSubmitButton';

const axios = require('axios');

export default function Profil() {
	const { id } = useParams();
	const { setAuth, auth } = useAuth();
	const [user, setUser] = React.useState({});
	const [changePw, setChangePw] = React.useState(false);
	const [password, setPassword] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
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

	// Fonction qui fait passer isToggled à true/false lorsqu'on appuie sur le bouton pour modifier le profil, ce qui permet d'afficher le composant pour éditer le profil.
	const editProfil = () => setIsToggled((prev) => !prev);

	// Fonction qui fait passer changePw à true/false lorsqu'on appuie sur le bouton pour changer de mdp, ce qui permet d'afficher le composant pour changer de mdp.
	const editPw = () => setChangePw((prev) => !prev);

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: type === 'file' ? files[0] : value,
		}));
	};

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
			setAuth((prev) => ({ ...prev, user: result.data.user }));
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

	const submitNewPassword = async (e) => {
		e.preventDefault();

		if (newPassword === confirmNewPassword) {
			if (securedPassword === true) {
				try {
					const config = {
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					};
					const form = { password, newPassword };
					const result = await axios.put(
						`http://localhost:3000/api/user/${id}/password`,
						form,
						config
					);
					setRefresh((prev) => !prev);
					setChangePw((prev) => !prev);
					setIncorrectPassword('');
					setWrongPasswords('');
					setPassword('');
					setNewPassword('');
					setConfirmNewPassword('');

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
			<Container
				sx={{
					marginTop: {
						xs: 8,
						sm: 8,
						md: 8,
						lg: 2,
						xl: 2,
					},
					width: {
						xs: '100%',
						sm: '100%',
						md: '100%',
						lg: '50%',
						xl: '50%',
					},
				}}
			>
				<Card>
					<CardContent>
						<Typography variant="h4" sx={{ textAlign: 'center' }}>
							Profil
						</Typography>
					</CardContent>
				</Card>
				{isToggled ? (
					<EditProfile
						key={user.id}
						picture={user.picture}
						firstName={user.firstName}
						email={user.email}
						toggled={isToggled}
						handleChange={handleChange}
					/>
				) : (
					!changePw && (
						<ProfileComponent
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
						confirmNewPw={confirmNewPassword}
						newPassword={newPassword}
						wrongPasswords={wrongPasswords}
						incorrectPassword={incorrectPassword}
						setPassword={setPassword}
						setNewPassword={setNewPassword}
						setConfirmNewPassword={setConfirmNewPassword}
						cancel={editPw}
						setWrongPasswords={setWrongPasswords}
						setIncorrectPassword={setIncorrectPassword}
						isInputValid={isInputValid}
					/>
				)}
				<Container
					sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
				>
					{isUser && !changePw && (
						<EditProfileSubmitButton
							isToggled={isToggled}
							handleSubmit={handleSubmit}
							editProfil={editProfil}
						/>
					)}
					{isUser && !isToggled && !changePw && (
						<DeleteAccountButton handleDelete={handleDelete} />
					)}
					{isUser && !isToggled && (
						<EditPasswordSubmitButton
							changePw={changePw}
							submitNewPassword={submitNewPassword}
							editPw={editPw}
						/>
					)}
				</Container>
			</Container>
		</Stack>
	);
}
