/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../styles/index.css';

export default function ProfilComponent({
	firstName,
	lastName,
	email,
	birthday,
}) {
	return (
		<div>
			<div className="profil-info">
				<p>Prénom</p>
				<h2>{firstName}</h2>
			</div>
			<div className="profil-info">
				<p>Nom</p>
				<h2>{lastName}</h2>
			</div>
			<div className="profil-info">
				<p>Email</p>
				<h2>{email}</h2>
			</div>
			<div className="profil-info">
				<p>Anniversaire</p>
				<h2>{birthday}</h2>
			</div>
		</div>
	);
}
