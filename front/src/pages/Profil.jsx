/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { useParams } from 'react-router-dom';

// import EditProfil from '../components/EditProfil';
import ProfilComponent from '../components/Profil';

const axios = require('axios');

export default function Profil() {
	const authToken = localStorage.getItem('token');
	const { id } = useParams();
	const [user, setUser] = React.useState({});
	const [button, setButton] = React.useState(false);
	const [isUser, setIsUser] = React.useState(false);
	const userUrl = `http://localhost:3000/api/user/${id}`;

	React.useEffect(() => {
		const fetchData = async () => {
			const result = await axios(userUrl, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			console.log(result);

			setUser(result.data.user);
			if (result.data.user.id === result.data.userId) {
				setIsUser(true);
			}
		};
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const result = await axios.put(
				`http://localhost:3000/api/user/${id}`,
				user,
				{
					headers: { Authorization: `Bearer ${authToken}` },
				}
			);
			console.log(result.data);
			localStorage.setItem('user', JSON.stringify(result.data.user));
		} catch (error) {
			console.log(error);
		}

		setButton((prevButton) => !prevButton);
	};

	return (
		<div className="profil-container">
			<h1>Informations Personnelles</h1>{' '}
			{isUser && (
				<button
					className="form--submit"
					type="button"
					onClick={button ? handleSubmit : editProfil}
				>
					{button ? 'Terminer' : 'Modifier'}
				</button>
			)}
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
