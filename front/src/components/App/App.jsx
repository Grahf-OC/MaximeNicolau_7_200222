/* eslint-disable no-console */
import React from 'react';
import '../../styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Axios from 'axios';
import RequireAuth from '../RequireAuth';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Profil from '../../pages/Profil';
import Membres from '../../pages/Membres';
import { AuthProvider } from '../../context/AuthProvider';

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					{/* Public Routes */}
					<Route path="/Login" element={<Login />} />
					<Route path="/Signup" element={<Signup />} />

					{/* Protected Routes */}
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Home />} />
						<Route path="/Membres" element={<Membres />} />
						<Route path="/Profil/:id" element={<Profil />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

/* Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.common.Authorization = 'AUTH TOKEN';

Axios.interceptors.request.use(
	(request) => {
		console.log(request);
		// Edit request config
		return request;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

Axios.interceptors.response.use(
	(response) => {
		console.log(response);
		// Edit response config
		return response;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
); */
