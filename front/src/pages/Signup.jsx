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

	const [formData, setFormData] = React.useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		birthday: '',
		isAdmin: false,
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}

	// TODO: refacto if/else

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (formData.password === formData.confirmPassword) {
			try {
				const result = await axios.post(urlSignup, formData);
				console.log(result);
				const { token, user } = result.data;
				localStorage.setItem('token', token);
				localStorage.setItem('myUser', JSON.stringify(user));
				setAuth({ token, user });
			} catch (error) {
				console.log(error);
			}
			console.log('Successfully signed up');
		} else {
			console.log('Passwords do not match');
		}
		navigate('/');
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
							onChange={handleChange}
							value={formData.email}
						/>

						<input
							type="firstName"
							placeholder="Prénom"
							className="form--input"
							name="firstName"
							onChange={handleChange}
							value={formData.firstName}
						/>

						<input
							type="lastName"
							placeholder="Nom de famille"
							className="form--input"
							name="lastName"
							onChange={handleChange}
							value={formData.lastName}
						/>

						<input
							type="password"
							placeholder="Mot de passe"
							className="form--input"
							name="password"
							onChange={handleChange}
							value={formData.password}
						/>

						<input
							type="password"
							placeholder="Confirmer le mot de passe"
							className="form--input"
							name="confirmPassword"
							onChange={handleChange}
							value={formData.confirmPassword}
						/>

						<input
							type="birthday"
							placeholder="Date d'anniversaire"
							className="form--input"
							name="birthday"
							onChange={handleChange}
							value={formData.birthday}
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
