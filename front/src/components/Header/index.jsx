/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	const logout = () => {
		localStorage.clear();
	};

	return (
		<nav>
			<Link to="/">Accueil</Link>
			<Link to="/Form">S'inscrire</Link>
			<Link to="/Membres">Liste des membres</Link>
			<Link to="/Profil/:id">Profil</Link>
			<button className="form--submit" type="button" onClick={logout}>
				Logout
			</button>
		</nav>
	);
}
