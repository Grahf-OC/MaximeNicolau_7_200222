/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../../styles/index.css';

export default function EditProfil({
	firstName,
	lastName,
	email,
	password,
	birthday,
	onChange,
}) {
	return (
		<div className="form-container">
			<form className="form">
				<input
					type="email"
					placeholder={email}
					className="form--input"
					name="email"
					onChange={onChange}
					value={email}
				/>

				<input
					type="firstName"
					placeholder={firstName}
					className="form--input"
					name="firstName"
					onChange={onChange}
					value={firstName}
				/>

				<input
					type="lastName"
					placeholder={lastName}
					className="form--input"
					name="lastName"
					onChange={onChange}
					value={lastName}
				/>

				<input
					type="password"
					placeholder={password}
					className="form--input"
					name="password"
					onChange={onChange}
					value={password}
				/>

				<input
					type="birthday"
					placeholder={birthday}
					className="form--input"
					name="birthday"
					onChange={onChange}
					value={birthday}
				/>
			</form>
		</div>
	);
}
