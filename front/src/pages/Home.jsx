/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../styles/index.css';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<nav className="Nav-bar">
					<Link to="./Form.jsx">S'inscire</Link>
				</nav>
			</header>
		</div>
	);
}
