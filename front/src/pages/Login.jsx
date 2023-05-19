/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
// import { useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
import '../styles/index.css';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { InputLabel, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import logo from '../images/logo-join-us3.png';
import useAuth from '../hooks/useAuth';

export default function Login() {
	const urlLogin = 'http://localhost:3000/api/auth/login';
	const { setAuth } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/';
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [wrongId, setWrongId] = React.useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const form = { email, password };
			const result = await axios.post(urlLogin, form);
			const { token, user } = result.data;
			setAuth({ token, user });
			navigate(from, { replace: true });
		} catch (error) {
			console.log(error);
			return setWrongId('Identifiants incorrects');
		}
		return console.log('Successfully signed up');
	};

	/* Sign in with google :
	function handleCallbackResponse(response) {
		// const userGoogle = jwt_decode(response.credential);
		const token = response;
		setAuth({ token });
		navigate(from, { replace: true });
	}

	useEffect(() => {
		à mettre en commentaire si j'enlève le commentaire global, pour signifier à eslint que google est connu globalement :  global google 
		google.accounts.id.initialize({
			client_id:
				'670441777219-1bj4mmlhpnrhgsd65u8foglcfmpgmal5.apps.googleusercontent.com',
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(
			document.getElementById('googleSignInButton'),
			{ theme: 'outline', size: 'large' }
		);

		google.accounts.id.prompt();
	}, []);

	div à ajouter pour que le bouton apparaisse: 				<div id="googleSignInButton" />
	ne pas oublier le script google dans ma page html si je veux tout enlever.

	*/

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
					Entrez, et détendez-vous.
				</Typography>
			</Stack>
			<Box
				sx={{
					width: {
						xs: '100%',
						sm: '80%',
						md: '50%',
						lg: '30%',
						xl: '30%',
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
							name="email"
							onChange={(e) => {
								setEmail(e.target.value);
								setWrongId('');
							}}
							value={email}
							label="Email"
							sx={{ mb: 4 }}
							error={wrongId !== ''}
							helperText={wrongId}
						/>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel htmlFor="password" />

						<TextField
							type="password"
							id="password"
							placeholder="Password"
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
								setWrongId('');
							}}
							value={password}
							label="Mot de passe"
							sx={{ mb: 4 }}
							error={wrongId !== ''}
							helperText={wrongId}
						/>
						<Button variant="contained" type="submit" onClick={handleSubmit}>
							Se connecter
						</Button>

						<Button
							component={Link}
							to="/signup"
							sx={{ color: '#CB8EC8', mt: 3 }}
							startIcon={<EmojiPeopleIcon />}
						>
							Pas encore inscrit? C'est pas ici!
						</Button>
					</FormControl>
				</Container>
			</Box>
		</Stack>
	);
}

/* <Stack
sx={{ display: 'flex', justifyContent: 'center' }}
display="flex"
justifyContent="center"
>
<ListItem key="signup">
	<ListItemButton component={Link} to="/signup">
		<ListItemIcon sx={{ color: '#90CAF9' }}>
			<EmojiPeopleIcon />
		</ListItemIcon>
		<ListItemText
			sx={{ color: '#CB8EC8' }}
			primary="Pas encore inscrit? C'est par ici!"
		/>
	</ListItemButton>
</ListItem>
</Stack> */
