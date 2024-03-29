/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React from 'react';
import '../styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Axios from 'axios';
import { ConfirmProvider } from 'material-ui-confirm';
import CssBaseline from '@mui/material/CssBaseline';
import RequireAuth from './RequireAuth';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Members from '../pages/Members';
import { AuthProvider } from '../context/AuthProvider';
import { ToggleColorMode } from '../context/ColorModeContext';

export default function App() {
	return (
		<BrowserRouter>
			<ToggleColorMode>
				<CssBaseline />
				<ConfirmProvider>
					<AuthProvider>
						<Routes>
							{/* Public Routes */}
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />

							{/* Protected Routes */}
							<Route element={<RequireAuth />}>
								<Route path="/" element={<Home />} />
								<Route path="/membres" element={<Members />} />
								<Route path="/profil/:id" element={<Profile />} />
							</Route>
						</Routes>
					</AuthProvider>
				</ConfirmProvider>
			</ToggleColorMode>
		</BrowserRouter>
	);
}
