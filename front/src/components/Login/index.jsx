/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../styles/index.css';
import axios from 'axios';

export default function Header() {
	const urlLogin = 'http://localhost:3000/api/auth/login';

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
			localStorage.setItem('token', result.data.token);
			localStorage.setItem('myUser', JSON.stringify(result.data.user));
		} catch (error) {
			console.log(error);
		}
		console.log('Successfully signed up');
	};

	return (
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

			<button className="form--submit" type="submit">
				Login
			</button>
		</form>
	);
}
