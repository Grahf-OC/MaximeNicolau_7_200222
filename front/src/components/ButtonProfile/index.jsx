/* eslint-disable react/prop-types */
import React from 'react';
import '../../styles/index.css';

export default function Button({ handleSubmit, editProfil, button, isUser }) {
	if ({ isUser }) {
		return (
			<button
				className="form--submit"
				type="button"
				onClick={{ button } ? { handleSubmit } : { editProfil }}
			>
				{{ button } ? 'Terminer' : 'Modifier'}
			</button>
		);
	}
	return null;
}
