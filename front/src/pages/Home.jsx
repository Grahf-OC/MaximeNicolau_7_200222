/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
import '../styles/index.css';
import Login from '../components/Login';

export default function Home() {
	return (
		<div className="App">
			<Login />
		</div>
	);
}
