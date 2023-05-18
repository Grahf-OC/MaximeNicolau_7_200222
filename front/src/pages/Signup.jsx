/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import { InputLabel, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../images/logo-join-us3.png';
import useAuth from '../hooks/useAuth';

export default function Signup() {
	const urlSignup = 'http://localhost:3000/api/auth/signup';
	const navigate = useNavigate();
	const { setAuth } = useAuth();
	const [wrongPasswords, setWrongPasswords] = React.useState('');
	const [checkNotEmpty, setCheckNotEmpty] = React.useState('');
	const [firstName, setFirstName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [securedPassword, setSecuredPassword] = React.useState(false);

	// Vérification de la force du mot de passe

	const isInputValid = (regex, e) => {
		if (regex.test(e)) {
			return setSecuredPassword(true);
		}
		return setSecuredPassword(false);
	};

	// Envoi du formulaire de signup.

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password === confirmPassword) {
			if (email !== '' || firstName !== '' || password !== '') {
				if (securedPassword === true) {
					try {
						const form = { email, password, firstName };
						const result = await axios.post(urlSignup, form);
						console.log(result);
						const { token, user } = result.data;
						setWrongPasswords('');
						setCheckNotEmpty('');
						setAuth({ token, user });
						navigate('/');
					} catch (error) {
						console.log(error);
					}
				} else {
					return alert(
						'Au moins 8 caractères, une majuscule, un chiffre et un caractère spécial'
					);
				}
			} else {
				return setCheckNotEmpty('Veuillez remplir tous les champs');
			}
			return console.log('Successfully signed up');
		}
		console.log('Passwords do not match');
		return setWrongPasswords('Mots de passe non identiques!');
	};

	const goHome = () => {
		navigate('/');
	};

	return (
		<Stack alignItems="center">
			<Stack
				alignItems="center"
				sx={{
					width: {
						xs: '70%',
						sm: '50%',
						md: '35%',
						lg: '25%',
						xl: '25%',
					},
					marginTop: 2,
				}}
			>
				<CardMedia
					component="img"
					image={logo}
					alt="Logo JoinUs"
					sx={{ height: 250, objectFit: 'contain' }}
				/>

				<Typography gutterBottom variant="h6">
					Bienvenue sur JoinUs
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Entrez, et détendez-vous!
				</Typography>
			</Stack>
			<Box
				sx={{
					width: {
						xs: '200%',
						sm: '180%',
						md: '120%',
						lg: '100%',
						xl: '100%',
					},
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginTop: 5,
					}}
				>
					<FormControl fullWidth>
						<InputLabel htmlFor="email" />
						<TextField
							type="email"
							id="email"
							placeholder="Adresse email"
							name="email"
							onChange={(e) => {
								setEmail(e.target.value);
								setCheckNotEmpty('');
							}}
							value={email}
							label="Email"
							sx={{ mb: 2 }}
							error={checkNotEmpty !== ''}
							helperText={checkNotEmpty}
						/>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel htmlFor="firstName" />
						<TextField
							type="firstName"
							id="firstName"
							placeholder="Prénom"
							name="firstName"
							onChange={(e) => {
								setFirstName(e.target.value);
								setCheckNotEmpty('');
							}}
							value={firstName}
							label="Prénom"
							sx={{ mb: 2 }}
							error={checkNotEmpty !== ''}
							helperText={checkNotEmpty}
						/>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel htmlFor="password" />
						<TextField
							type="password"
							id="password"
							placeholder="Mot de passe"
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
								setWrongPasswords('');
								setCheckNotEmpty('');
								isInputValid(
									/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
									e.target.value
								);
							}}
							value={password}
							label="Mot de passe"
							sx={{ mb: 2 }}
							error={wrongPasswords !== ''}
							helperText={wrongPasswords}
						/>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel htmlFor="confirmPassword" />
						<TextField
							type="password"
							id="confirmPassword"
							placeholder="Confirmer le mot de passe"
							name="confirmPassword"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setWrongPasswords('');
								setCheckNotEmpty('');
							}}
							value={confirmPassword}
							label="Confirmer mot de passe"
							sx={{ mb: 2 }}
							error={wrongPasswords !== ''}
							helperText={wrongPasswords}
						/>
					</FormControl>

					<Button
						variant="contained"
						type="submit"
						sx={{ marginTop: '10px' }}
						onClick={handleSubmit}
					>
						S&apos;inscrire
					</Button>
				</Container>
			</Box>

			<Button
				sx={{ marginTop: '5px' }}
				variant="contained"
				type="submit"
				onClick={goHome}
			>
				Accueil
			</Button>
		</Stack>
	);
}
