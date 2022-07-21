/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import '../styles/index.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../components/Header/Header';

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
		<Stack direction="row" justifyContent="space-evenly">
			<Header />
			<Container>
				<form className="form" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email adress"
						className="form--input"
						name="email"
						onChange={handleChange}
						value={formData.email}
					/>

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
				</form>
			</Container>
		</Stack>
	);
}
