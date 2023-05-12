/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
// import { useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
import '../styles/index.css';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { CardActionArea, InputLabel, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import logo from '../images/icon-above-font.png';
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
		<Stack direction="column" alignItems="center">
			<Card
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
				<CardActionArea>
					<CardMedia
						component="img"
						height="180"
						image={logo}
						alt="Logo groupomania"
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
							Bienvenue sur JoinUs
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Entrez, et détendez-vous!
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
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
				<Container>
					<FormControl>
						<InputLabel htmlFor="email">Email</InputLabel>
						<OutlinedInput
							type="email"
							placeholder="Email adress"
							name="email"
							onChange={(e) => {
								setEmail(e.target.value);
								setWrongId('');
							}}
							value={email}
							label="Email"
						/>

						<p className="error">{wrongId}</p>

						<Typography
							gutterBottom
							variant="h6"
							sx={{ marginLeft: 2, fontsize: 10 }}
						>
							Mot de passe:
						</Typography>

						<OutlinedInput
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
								setWrongId('');
							}}
							value={password}
						/>
						<Button variant="contained" type="submit" onClick={handleSubmit}>
							Se connecter
						</Button>
						<ListItem key="signup">
							<ListItemButton component={Link} to="/signup">
								<ListItemIcon sx={{ color: '#FD2D01' }}>
									<EmojiPeopleIcon />
								</ListItemIcon>
								<ListItemText
									sx={{ color: '#FD2D01' }}
									primary="Pas encore inscrit? C'est par ici!"
								/>
							</ListItemButton>
						</ListItem>
					</FormControl>
				</Container>
			</Box>
		</Stack>
	);
}
