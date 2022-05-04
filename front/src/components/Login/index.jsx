/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../styles/index.css';

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

	function handleSubmit(event) {
		event.preventDefault();
		fetch(urlLogin, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => localStorage.setItem('user', JSON.stringify(data.user)))
			.catch((error) => error);
		console.log('Successfully signed up');
	}

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
