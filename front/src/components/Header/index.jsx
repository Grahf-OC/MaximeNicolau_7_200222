/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<nav>
			<Link to="/">Accueil</Link>
			<Link to="/Form">S'inscire</Link>
			<Link to="/Profil">Profil</Link>
		</nav>
	);
}
