/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import EditProfil from '../components/EditProfil';
import ProfilComponent from '../components/Profil';

export default function Profil() {
	const { id } = useParams();
	const [user, setUser] = React.useState([]);
	const [button, setButton] = React.useState(false);
	const userUrl = `http://localhost:3000/api/user/${id}`;

	React.useEffect(() => {
		async function fetchData() {
			const result = await axios(userUrl);
			setUser(result.data);
		}
		fetchData();
	}, []);

	const editProfil = () => setButton((prevButton) => !prevButton);

	function handleChange(event) {
		const { name, value } = event.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/api/user/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => localStorage.setItem('user', JSON.stringify(data.user)));
		setButton((prevButton) => !prevButton).catch((error) => error);
	}

	return (
		<div className="profil-container">
			<h1>Informations Personnelles</h1>{' '}
			<button
				className="form--submit"
				type="button"
				onClick={button ? handleSubmit : editProfil}
			>
				{button ? 'Terminer' : 'Modifier'}
			</button>
			{button ? (
				<form className="form">
					<input
						type="email"
						placeholder={user.email}
						className="form--input"
						name="email"
						onChange={handleChange}
						value={user.email}
					/>

					<input
						type="firstName"
						placeholder={user.firstName}
						className="form--input"
						name="firstName"
						onChange={handleChange}
						value={user.firstName}
					/>

					<input
						type="lastName"
						placeholder={user.lastName}
						className="form--input"
						name="lastName"
						onChange={handleChange}
						value={user.lastName}
					/>

					<input
						type="birthday"
						placeholder={user.birthday}
						className="form--input"
						name="birthday"
						onChange={handleChange}
						value={user.birthday}
					/>
				</form>
			) : (
				<ProfilComponent
					key={user.id}
					firstName={user.firstName}
					lastName={user.lastName}
					email={user.email}
					birthday={user.birthday}
				/>
			)}
		</div>
	);
}

/* <EditProfil
key={user.id}
firstName={user.firstName}
lastName={user.lastName}
email={user.email}
birthday={user.birthday}
password={user.password}
onChange={() => handleChange()}
/> */
