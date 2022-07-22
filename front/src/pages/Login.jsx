/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import '../styles/index.css';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { CardActionArea } from '@mui/material';
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

	const [formData, setFormData] = React.useState({
		email: '',
		password: '',
		isAdmin: false,
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const result = await axios.post(urlLogin, formData);
			const { token, user } = result.data;
			localStorage.setItem('token', token);
			localStorage.setItem('myUser', JSON.stringify(user));
			setAuth({ token, user });
			navigate(from, { replace: true });
		} catch (error) {
			console.log(error);
		}
		console.log('Successfully signed up');
	};

	return (
		<Stack direction="column" alignItems="center">
			<Card sx={{ width: 450, maxWidth: 500, marginTop: 2 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="180"
						image={logo}
						alt="Logo groupomania"
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
							Le réseau social Groupomania
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Entrez, et détendez-vous!
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<form className="form" onSubmit={handleSubmit}>
				<Typography
					gutterBottom
					variant="h6"
					size="10"
					component="div"
					sx={{ marginLeft: 2, fontsize: 10 }}
				>
					Adresse email:
				</Typography>
				<input
					type="email"
					placeholder="Email adress"
					className="form--input"
					name="email"
					onChange={handleChange}
					value={formData.email}
				/>

				<Typography
					gutterBottom
					variant="h6"
					size="10"
					component="div"
					sx={{ marginLeft: 2, fontsize: 10 }}
				>
					Mot de passe:
				</Typography>

				<input
					type="password"
					placeholder="Password"
					className="form--input"
					name="password"
					onChange={handleChange}
					value={formData.password}
				/>
				<Button variant="contained" type="submit">
					Se connecter
				</Button>
				<ListItem key="signup">
					<ListItemButton component={Link} to="/signup">
						<ListItemIcon color="red">
							<EmojiPeopleIcon />
						</ListItemIcon>
						<ListItemText primary="Pas encore inscrit? C'est par ici!" />
					</ListItemButton>
				</ListItem>
			</form>
		</Stack>
	);
}
