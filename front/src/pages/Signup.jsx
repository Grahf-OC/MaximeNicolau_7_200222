/* eslint-disable no-console */
import React from 'react';
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Header from '../components/Header/Header';
import useAuth from '../hooks/useAuth';

export default function Signup() {
	const urlSignup = 'http://localhost:3000/api/auth/signup';
	const navigate = useNavigate();
	const { setAuth } = useAuth();
	const [wrongPassword, setWrongPassword] = React.useState('');
	const [firstName, setFirstName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password === confirmPassword) {
			try {
				const form = { email, password, firstName };
				const result = await axios.post(urlSignup, form);
				console.log(result);
				const { token, user } = result.data;
				localStorage.setItem('token', token);
				localStorage.setItem('myUser', JSON.stringify(user));
				setWrongPassword('');
				setAuth({ token, user });
				navigate('/');
			} catch (error) {
				console.log(error);
			}
			console.log('Successfully signed up');
		} else {
			console.log('Passwords do not match');
			setWrongPassword('Mots de passe non identiques!');
		}
	};

	return (
		<Stack direction="row" justifyContent="space-evenly">
			<Header />
			<Container>
				<div className="form-container">
					<form className="form" onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Adresse email"
							className="form--input"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>

						<input
							type="firstName"
							placeholder="Prénom"
							className="form--input"
							name="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						/>

						<input
							type="password"
							placeholder="Mot de passe"
							className="form--input"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>

						<p>{wrongPassword}</p>

						<input
							type="password"
							placeholder="Confirmer le mot de passe"
							className="form--input"
							name="confirmPassword"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
						/>

						<Button variant="contained" type="submit">
							S&apos;inscrire
						</Button>
					</form>
				</div>
			</Container>
		</Stack>
	);
}
