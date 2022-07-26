/* eslint-disable no-console */
import React from 'react';
import '../../styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Axios from 'axios';
import { ConfirmProvider } from 'material-ui-confirm';
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
			<ConfirmProvider>
				<AuthProvider>
					<Routes>
						{/* Public Routes */}
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />

						{/* Protected Routes */}
						<Route element={<RequireAuth />}>
							<Route path="/" element={<Home />} />
							<Route path="/membres" element={<Membres />} />
							<Route path="/profil/:id" element={<Profil />} />
						</Route>
					</Routes>
				</AuthProvider>
			</ConfirmProvider>
		</BrowserRouter>
	);
}
