/* eslint-disable no-console */
import React from 'react';
import '../styles/index.css';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

export default function Form() {
	const urlSignup = 'http://localhost:3000/api/auth/signup';
	// const urlLogin = 'http://localhost:3000/api/auth/login';
	const navigate = useNavigate();

	const [formData, setFormData] = React.useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		isAdmin: false,
		picture: '',
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (formData.password === formData.confirmPassword) {
			fetch(urlSignup, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then((data) => console.log(data)) // window.location.href
				.catch((error) => error);

			console.log('Successfully signed up');
		} else {
			console.log('Passwords do not match');
		}
		navigate('/');
	}

	return (
		<div className="form-container">
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
					type="firstName"
					placeholder="First Name"
					className="form--input"
					name="firstName"
					onChange={handleChange}
					value={formData.firstName}
				/>

				<input
					type="lastName"
					placeholder="Lastname"
					className="form--input"
					name="lastName"
					onChange={handleChange}
					value={formData.lastName}
				/>

				<input
					type="password"
					placeholder="Password"
					className="form--input"
					name="password"
					onChange={handleChange}
					value={formData.password}
				/>

				<input
					type="confirmPassword"
					placeholder="Confirm Password"
					className="form--input"
					name="confirmPassword"
					onChange={handleChange}
					value={formData.confirmPassword}
				/>

				<button className="form--submit" type="submit">
					Sign up
				</button>
			</form>
		</div>
	);
}
